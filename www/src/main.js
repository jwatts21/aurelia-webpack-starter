import '../styles/site.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import {urls} from './config/urls';
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: true });

export async function configure(aurelia) {
	aurelia.use.instance('appUrls', urls);
	aurelia.use.instance('apiRoot', 'https://localhost/');
	// aurelia.use.globalResources('common/dateFormat');
	aurelia.use
	.standardConfiguration()
  // .developmentLogging()
	.plugin('aurelia-validation')
	.plugin('aurelia-validatejs')
  .plugin('aurelia-dialog')
	.feature('bootstrap-validation')

	// aurelia.start().then(a=>a.setRoot("shell"));
	// aurelia.start().then(a => a.setRoot());

  await aurelia.start();
  aurelia.setRoot('app');

}
