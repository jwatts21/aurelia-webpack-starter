import {inject,NewInstance} from "aurelia-framework";
import {DialogService} from 'aurelia-dialog';
import {SchoolRepository} from "../schools/schoolRepository";
import {UserRepository} from "../user/userRepository";
import {Prompt} from '../components/modal/submit';
import {Router} from 'aurelia-router';
import toastr from "toastr";
import R from "ramda";

import {ValidationController,ValidationRules} from 'aurelia-validation';




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
export class Reg {

  // @required
  // firstName = '';

  // @required
  // lastName = '';

  // @required
  // phone = '';




  constructor(schoolRepository,userRepository,dialogService,router,controller){
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
    .ensure('custId').required()
    .ensure('phone').required()
    .on(this.user);

    
  }

  // activate(bindingContext) {
  //    this.schoolRepository.getSchools()
  //   .then(schools => {
  //     console.log('got schools')
  //     console.log(schools)
  //     this.schools  = schools
  //   });
  // }

 
  async activate(bindingContext) {
    let schl =  await this.schoolRepository.getSchools()
    this.schools  = schl

  }

  bind() {
    
  }

   attached(routeConfig) {
       this.controller.validate();
   }

  save(event){
      //let errors = this.controller.validate();  
     this.confirmUserPhone({viewModel: Prompt})
  }

}



