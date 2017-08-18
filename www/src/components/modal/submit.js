import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class Prompt {

    message = "Please enter the 4 digit confirmation code you received on your mobile phone to complete your notification setup"
 
   constructor(controller){
      this.controller = controller;
      this.answer = null;
    
      controller.settings.centerHorizontalOnly = true;
   }

   activate(message) {
      //this.message = message;
   }

   ok() {
		this.dialogController.ok();
	}

	cancel() {
		this.dialogController.cancel();
	}
}