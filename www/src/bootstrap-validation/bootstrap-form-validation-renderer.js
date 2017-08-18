import {inject} from 'aurelia-dependency-injection';
import {validationRenderer} from 'aurelia-validation';
 
// @validationRenderer - don 't use this, it causes errors 
@inject(Element)
 
export class BootstrapFormValidationRenderer {
  constructor(boundaryElement) {
    this.boundaryElement = boundaryElement;
  }
 
  render(instruction) {
     if (instruction.unrender.length > 0 ) {
      this.unrenderBootstrap(instruction);
    }

    if (instruction.render.length > 0) {
      this.renderBootstrap(instruction);
    }
 
   
 
  }
 
  renderBootstrap(instruction) {
    // loop through each renderItem and display an error
    instruction.render.forEach(function (renderItem) {
    let target = renderItem.elements[0];
    target.errors = [renderItem.result];
    let error = renderItem.result
 
    // add the has-error class to the bootstrap form-group div
    const formGroup = target.querySelector('.form-group') || target.closest('.form-group');
    formGroup.classList.add('has-error');
 
    // add help-block
    const message = document.createElement('span');
    message.classList.add('help-block');
    message.classList.add('validation-error');
    message.textContent = error.message;
    message.error = error;
    formGroup.appendChild(message);
    });
  }
 
  unrenderBootstrap(instruction) {
    // loop through each renderItem and display an error
    instruction.unrender.forEach(function (unrenderItem) {
    let target = unrenderItem.elements[0];
    let error = unrenderItem.result;
    target.errors = [];
            // remove the has-error class on the bootstrap form-group div
            const formGroup = target.querySelector('.form-group') || target.closest('.form-group');
            formGroup.classList.remove('has-error');
         
            // remove all messages related to the error.
            let messages = formGroup.querySelectorAll('.validation-error');
            let i = messages.length;
            while(i--) {
              let message = messages[i];
              // if (message.error !== error) {
              //   continue;
              // }
              message.error = null;
              message.remove();
            }
    
      });
  }



}
 
// Polyfill for Element.closest and Element.matches
// https://github.com/jonathantneal/closest/
(function (ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
 
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        var element = this;
 
        while (element) {
            if (element.matches(selector)) {
                break;
            }
 
            element = element.parentElement;
        }
 
        return element;
    };
}(Element.prototype));
