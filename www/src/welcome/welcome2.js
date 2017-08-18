import {inject,NewInstance} from "aurelia-framework";
import {DialogService} from 'aurelia-dialog';
import {Router} from 'aurelia-router';
//import toastr from "toastr";
import R from "ramda";
import {ValidationController} from 'aurelia-validation';
import {required,ValidationRules} from 'aurelia-validatejs'

@inject(DialogService,Router,NewInstance.of(ValidationController))
export class Welcome {
  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;


  constructor(dialogService,router,controller){
    this.router = router
    this.controller = controller
    ValidationRules  
    .ensure('firstName').required()
    .on(this);

  }

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }

   attached(routeConfig) {
       this.controller.validate();
   }


}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
