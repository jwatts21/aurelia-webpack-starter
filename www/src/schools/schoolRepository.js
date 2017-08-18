import {HttpClient as HttpFetch, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import * as R from "ramda";


let httpClient = new HttpFetch();

function convert(response){
	return response.json()
}


function fetch(url){
	 return httpClient.fetch(url)   
}


@inject('apiRoot', R)
export class SchoolRepository{


	constructor(apiRoot, R) {
		this.apiRoot = apiRoot;
		this.R = R
	}


   getSchools(){
       return Promise.resolve(['Foo','Boo'])
        //return R.composeP(convert,fetch)(this.apiRoot + 'schools')

	}

	

}
