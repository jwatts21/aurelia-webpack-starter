import {PageObjectReg} from './reg.po.js';
// import {PageObjectSkeleton} from './skeleton.po.js';

describe('aurelia skeleton app', function() {
  let poReg;
  // let poSkeleton;

  beforeEach(() => {
    // poSkeleton = new PageObjectSkeleton();
    poReg = new PageObjectReg();

    browser.loadAndWaitForAureliaPage('http://localhost:3000');
  });

  // it('should load the page and display the initial page title', () => {
  //   expect(poSkeleton.getCurrentPageTitle()).toBe('Welcome | Aurelia');
  // });

  // it('should display greeting', () => {
  //   expect(poWelcome.getGreeting()).toBe('Welcome to the Aurelia Navigation App!');
  // });

  it('should automatically write down the fullname', () => {
      poReg.setFirstname('Jay');
      poReg.setLastname('Dog');
      poReg.setPhone('402 415-1136');
      poReg.setCustomerId('12345');
      poReg.pressSubmitButton()
      poReg.setConfirmation(666)
      poReg.pressConfirmationOk()
          // poReg.openAlertDialog()

    // For now there is a timing issue with the binding.
    // Until resolved we will use a short sleep to overcome the issue.
    browser.sleep(200);
    browser.pause();
    // expect(poWelcome.getFullname()).toBe('Rob');
  });

  // it('should show alert message when clicking submit button', () => {
  //   expect(poWelcome.openAlertDialog()).toBe(true);
  // });

  // it('should navigate to users page', () => {
  //   poSkeleton.navigateTo('#/users');
  //   expect(poSkeleton.getCurrentPageTitle()).toBe('Github Users | Aurelia');
  // });
});


//expect(browser.getCurrentUrl()).toMatch("/api/foo")
