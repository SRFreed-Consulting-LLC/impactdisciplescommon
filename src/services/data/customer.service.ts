import { Injectable } from '@angular/core';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { BaseService } from './base.service';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { Role } from 'impactdisciplescommon/src/lists/roles.enum';
import { Address } from 'impactdisciplescommon/src/models/domain/utils/address.model';
import { Phone } from 'impactdisciplescommon/src/models/domain/utils/phone.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel>{
  constructor(public override dao: FirebaseDAO<CustomerModel>, private toastrService: ToastrService) {
    super(dao)
    this.table="customers"
  }


  async createCustomerAccount(checkoutForm: CheckoutForm){
    return await this.getAllByValue('email', checkoutForm.email).then(async users => {
      if(users && users.length == 0){
        let newUser: CustomerModel = {... new CustomerModel()};
        newUser.firstName = checkoutForm.firstName;
        newUser.lastName = checkoutForm.lastName;
        newUser.email = checkoutForm.email;

        let billingAddress = {... new Address()};
        billingAddress.address1 = checkoutForm.billingAddress.address1;
        billingAddress.address2 = checkoutForm.billingAddress.address2 ? checkoutForm.billingAddress.address2 :  '';
        billingAddress.city = checkoutForm.billingAddress.city;
        billingAddress.state = checkoutForm.billingAddress.state;
        billingAddress.zip = checkoutForm.billingAddress.zip;
        billingAddress.country = checkoutForm.billingAddress.country;

        newUser.billingAddress = billingAddress;

        let shippingAddress = {... new Address()};
        shippingAddress.address1 = checkoutForm.shippingAddress.address1;
        shippingAddress.address2 = checkoutForm.shippingAddress.address2 ? checkoutForm.billingAddress.address2 :  '';
        shippingAddress.city = checkoutForm.shippingAddress.city;
        shippingAddress.state = checkoutForm.shippingAddress.state;
        shippingAddress.zip = checkoutForm.shippingAddress.zip;
        shippingAddress.country = checkoutForm.shippingAddress.country;

        if(checkoutForm.isShippingSameAsBilling){
          newUser.shippingAddress = billingAddress;
        } else {
          let shippingAddress = {... new Address()};
          shippingAddress.address1 = checkoutForm.shippingAddress.address1;
          shippingAddress.address2 = checkoutForm.shippingAddress.address2 ? checkoutForm.billingAddress.address2 :  '';
          shippingAddress.city = checkoutForm.shippingAddress.city;
          shippingAddress.state = checkoutForm.shippingAddress.state;
          shippingAddress.zip = checkoutForm.shippingAddress.zip;
          shippingAddress.country = checkoutForm.shippingAddress.country;

          newUser.shippingAddress = shippingAddress;
        }

        let phone = {... new Phone()}
        phone.countryCode = '1';
        phone.number = checkoutForm.phone.number;
        phone.extension = PHONE_TYPES.CELL;

        newUser.phone = phone;

        newUser.role = Role.CUSTOMER;
        return await this.add(newUser);
      } else  {
        this.toastrService.success('Warning', 'An account with this email already exists.', {
          timeOut: 10000,
        })

        return null;
      }
    })
  }
}
