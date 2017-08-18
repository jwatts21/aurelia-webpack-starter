import regeneratorRuntime from 'regenerator-runtime';

export class PageObjectReg {

  constructor() {

  }

  getGreeting() {
    return element(by.tagName('h2')).getText();
  }

  setFirstname(value) {
    return element(by.valueBind('user.firstName & validate')).clear().sendKeys(value); 
  }

  setLastname(value) {
     return element(by.valueBind('user.lastName & validate')).clear().sendKeys(value); 
  }

  setPhone(value) {
     return element(by.valueBind('user.phone & validate')).clear().sendKeys(value); 
  }

  setCustomerId(value) {
     return element(by.valueBind('user.custId & validate')).clear().sendKeys(value).sendKeys(protractor.Key.TAB); 
  }

  setConfirmation(value) {
    var confirmation = element(by.css('input[type="text"]'));
    browser.wait(EC.visibilityOf(confirmation), 5000);
    confirmation.sendKeys(value);
  }

  pressConfirmationOk(){

     // return element(by.xpath("//*[@class='au-target' and contains(text(),'Ok')]")).click();
     return element(by.buttonText("Ok")).click();
      // return element(by.cssContainingText('.au-target', 'Ok')).click();
  }


  getFullname() {
    return element(by.css('.help-block')).getText();
  }

  pressSubmitButton() {
    return element(by.css('button[type="submit"]')).click();
  }

  openAlertDialog() {
    return browser.wait(async () => {
      await this.pressSubmitButton();

      await browser.wait(ExpectedConditions.alertIsPresent(), 5000);

      return browser.switchTo().alert().then(
       // use alert.accept instead of alert.dismiss which results in a browser crash
        function(alert) { alert.accept(); return true; },
        function() { return false; }
      );
    });
  }
}
