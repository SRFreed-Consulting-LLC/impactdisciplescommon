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
      } else {
        console.log('no match found');
      }
    })


    this.getAllByValue('email', checkoutForm.email).then(users => {
      if(!users || users.length == 0){
        //create new user
        console.log("none found")
      } else if(users.length == 1){

        if(!users[0].bookLicenses){
          users[0].bookLicenses = []
        }

        licensedBooks.forEach(license => {
          if(!users[0].bookLicenses.find(l => l.bookId == license.bookId)){
            users[0].bookLicenses.push(license)
          } else {
            console.log('user already has license')
          }
        })

        //update user
        users[0].bookLicenses = licensedBooks;

        this.update(users[0].id, users[0])
      } else {
        //error
      }
    })


    console.log("ebooks ordered", checkoutForm)

  }
}
