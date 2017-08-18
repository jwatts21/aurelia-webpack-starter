 export class App {
	constructor(){
   
	}


  configureRouter(config, router) {
   
    config.title = "Text Notification";
    // config.options.pushState = true;
    config.map([
         { route: ['','payment', 'payment/reg'], moduleId: 'reg/reg', name: 'Events', title: 'P', nav: true}
    ]);

    this.router = router;
    // this.router.refreshNavigation();


  }



 //  bind() {}

 // attached() {}



}

//   { route: ['','payment', 'payment/reg'], moduleId: 'reg/reg', name: 'Events', title: 'P', nav: true}
// { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome/welcome', nav: true, title: 'Welcome' }
//// { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome/welcome', nav: true, title: 'Welcome' }
// { route: ['payment', 'payment/reg'], moduleId: 'reg/reg', name: 'Events', title: '', nav: true}
      
