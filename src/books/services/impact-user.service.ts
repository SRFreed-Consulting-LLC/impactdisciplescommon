import { Injectable } from '@angular/core';
import { ImpactUser } from 'impactdisciplescommon/src/books/models/impact-user.model';
import { BaseService } from './base.service';
import { FirebaseDAO } from './firebase.dao';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';
import { BookService } from './book.service';
import { BookModel } from '../models/book.model';
import { BookLicenseModel } from '../models/book-license.model';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ImpactUserService extends BaseService<ImpactUser>{
  constructor(public override dao: FirebaseDAO<ImpactUser>, private bookService: BookService) {
    super(dao)
    this.table="impact-users"
  }

  async registerImpactUser(checkoutForm: CheckoutForm){
    this.getAllByValue('email', checkoutForm.email).then(users => {
      if(!users || users.length == 0){
        let user: ImpactUser = {...new ImpactUser()}
        user.email = checkoutForm.email;
        user.firstName = checkoutForm.firstName;
        user.lastName = checkoutForm.lastName;
        user.phone = checkoutForm.phone;

        this.add(user).then(u => {
          this.getActiveLicenses(u, checkoutForm)
        })
      } else if(users.length == 1){
        this.getActiveLicenses(users[0], checkoutForm)
      }
    })
  }

  async getActiveLicenses(user: ImpactUser, checkoutForm: CheckoutForm){
    let books: BookModel[] = await this.bookService.getAll();

    let licensedBooks: BookLicenseModel[] = []

    books.forEach(book =>{
      let match = checkoutForm.cartItems.find(item => book.title.startsWith(item.itemName.split(' - ') [0]))

      if(match){
        let lm: BookLicenseModel = {...new BookLicenseModel()}
        lm.bookId = book.id;
        lm.bookTitle = book.title;
        lm.length = 1
        lm.type = 'year';
        lm.purchaseDate = Timestamp.now()
        licensedBooks.push(lm)
      }
    })

    if(user.bookLicenses){
      user.bookLicenses = []
    }

    licensedBooks.forEach(license => {
      if(user.bookLicenses.find(l => l.bookId == license.bookId)){
        user.bookLicenses.push(license)
      }
    })

    user.bookLicenses = licensedBooks;

    this.update(user.id, user)
  }
}
