exports.config = {
   seleniumAddress: 'http://localhost:3000/wd/hub',
  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    'e2e/**/*.js'
  ],

//  './**/*.spec.js
  suites: {
    smoke: './e2e/smoke/*.spec.js',
    longRunning: './ratings/a.bunch.of.long.tests.spec.js',
    full: './**/*.spec.js'
  },
  exclude: [],

  framework: 'jasmine',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: true,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    process.env.BABEL_ENV = 'e2e';
    global.EC = protractor.ExpectedConditions;
    require('babel-register')();
       browser.driver.manage().window().setPosition(0,0);
    browser.driver.manage().window().setSize(1280, 720);
  },

  plugins: [{
    package: 'aurelia-protractor-plugin'
  }]
};
