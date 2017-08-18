import 'toastr';
import {inject} from "aurelia-framework";
import {DialogService} from 'aurelia-dialog';
import {SchoolRepository} from "../schools/schoolRepository";
import {UserRepository} from "../user/userRepository";
import {Prompt} from '../components/modal/submit';
import {Router} from 'aurelia-router';
import toastr from "toastr";
import R from "ramda";


// let dialogService =  new DialogService() 
// function confirmation(){
//   console.log('inside confirmation')
//     dialogService.open({viewModel: Prompt, model: 'Are you sure?' })
//       .then(response => {
//          console.log(response);
      
//          if (!response.wasCancelled) {
//             console.log('OK');
//          } else {
//             console.log('cancelled');
//          }
//          console.log(response.output);
//       });
// }




// console.log(toastr)
  toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-center"
        };

function confirmationResult(response){
           if (!response.wasCancelled) {
                console.log('OK');
                fn(user)
             } else {
                console.log('cancelled');
             }
}

function confirmationResult2(fn,user){
    return function (response){
           if (!response.wasCancelled) {
                console.log('OK');
                console.log(user)
                fn(user)
             } else {
                console.log('cancelled');
             }
     }
}


 function saveUserResult(user){
      console.log('user added')
 }

@inject(SchoolRepository,UserRepository,DialogService,Router)
export class Reg {
  constructor(schoolRepository,userRepository,dialogService,router){
    this.schoolRepository = schoolRepository
    this.userRepository = userRepository
    this.dialogService = dialogService
    this.dialogOpen = R.bind(dialogService.open, dialogService);
    this.user={}
    // this.openDialog = R.composeP(confirmationResult,this.dialogOpen)

    this.bindUserRepository = R.bind(this.userRepository.save, this.userRepository)
    this.saveUser = R.composeP(saveUserResult,this.bindUserRepository)

    this.openDialog = R.composeP(confirmationResult2(this.saveUser,this.user),this.dialogOpen)

    this.input = "";
  
    this.item = {}
    this.item.enabled = false
    this.router = router
  }

  activate(bindingContext) {
     // console.log(bindingContext)
     this.schoolRepository.getSchools()
    .then(schools => this.schools  = schools);
  }

  bind() {
    
  }


  // configureRouter(config, router) {
  //   console.log('INSIDE HERE!!!')
  //   console.log(config)
  //   // this.router = router;
  // }


   attached(routeConfig) {
    console.log(routeConfig)
    // for demo only.
   // console.log('inside attached')
  }


 


  save(event){
     this.openDialog({viewModel: Prompt})

  }



  save2(event){
     //console.log(event)
      console.log(JSON.stringify(this.user))
      this.userRepository.save(this.user)
      .then(user=> {
        console.log('user added')
        // this.item.enabled = true
        //confirmation()

       // toastr.success('User info save', 'USER');
       this.openDialog({viewModel: Prompt})
   


      });

  }

}
