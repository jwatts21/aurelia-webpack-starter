import {inject,NewInstance} from "aurelia-framework";
import {DialogService} from 'aurelia-dialog';
import {SchoolRepository} from "../schools/schoolRepository";
import {UserRepository} from "../user/userRepository";
import {Prompt} from '../components/modal/submit';
import {Router} from 'aurelia-router';
import toastr from "toastr";
import R from "ramda";
import {ValidationController,ValidationRules} from 'aurelia-validation';
//import {required,ValidationRules} from 'aurelia-validatejs'


console.log('toastr')
console.log(toastr)

toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-center"
        };



function confirmationResult(fn,user){
    return function (response){
           if (!response.wasCancelled) {
                fn(R.dissoc('__metadata__', user))
             } else {
                console.log('cancelled');
             }
     }
}


 function saveUserResult(user){
      console.log('user added')
 }


@inject(SchoolRepository,UserRepository,DialogService,Router,NewInstance.of(ValidationController))
export class Welcome {
  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = '';
  lastName = '';
  previousValue = this.fullName;


  // constructorx(dialogService,router,controller){
  //   this.router = router
  //   this.controller = controller
  //   ValidationRules  
  //   .ensure('firstName').required()
  //   .on(this);

  // }

    constructor(schoolRepository,userRepository,dialogService,router,controller){
    console.log('INSIDE REG constructor')
     console.log(controller)
    this.controller = controller
    this.schoolRepository = schoolRepository
    this.userRepository = userRepository
    this.dialogService = dialogService
    this.dialogOpen = R.bind(dialogService.open, dialogService);
    this.user={}
    this.bindUserRepository = R.bind(this.userRepository.save, this.userRepository)
    this.saveUser = R.composeP(saveUserResult,this.bindUserRepository)
 
    let saveUserOnConfirmation = confirmationResult(this.saveUser,this.user)
    this.confirmUserPhone = R.composeP(saveUserOnConfirmation,this.dialogOpen)

    this.input = "";
 
    this.item = {}
    this.item.enabled = false
    this.router = router
    
    //console.log(this.router.generate('Confirm'))
    //this.router.navigate(this.router.generate('Confirm'))
     ValidationRules  
          .ensure('firstName').required()
          .ensure('lastName').required()
          .on(this);
    
  }


  activate(bindingContext) {
      this.controller.validate();
     this.schoolRepository.getSchools()
    .then(schools => {
      console.log('got schools')
      console.log(schools)
      this.schools  = schools
    });
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
    let errors = this.controller.validate(); 
    //console.log('validation error') 
    //console.log(errors)
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }

   attached(routeConfig) {
       console.log('inside attached!!!')
       this.controller.validate();
   }


}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
