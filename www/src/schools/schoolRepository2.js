import {HttpClient as HttpFetch, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
// import {ramba as R} from 'ramda';
import * as R from "ramda";

let httpClient = new HttpFetch();

function convert(response){
	return response.json()
}


function fetch(url){
	 return httpClient.fetch(url)   
}

function fetchx(fn){
	return function (url){
		console.log(`calling ${url}`)
	     return httpClient.fetch(url)
    }
}


@inject('apiRoot', HttpFetch, R)
export class SchoolRepository{


	constructor(apiRoot, httpFetch, R) {
		this.apiRoot = apiRoot;
		this.httpFetch = httpFetch;
		this.R = R
	}


   getSchools(){
        return R.composeP(convert,fetch)(this.apiRoot + 'schools')

	}

	getSchoolsXX(){

        return this.httpFetch.fetch(this.apiRoot + 'schools').then(response => response.json())
			.catch(err=>{
				console.log(`ERROR OCCURRED WITH FETCHING SCHOOLS`)
				console.log(err)
				return [{name: 'Barker College'},{name: 'College College'}]
			});

	}



   getSchoolsx() {
		var promise = new Promise((resolve, reject) => {
			if (!this.schools) {
				this.httpFetch.fetch(this.apiRoot + 'schools')
				.then(response => response.json())
				.then( data => {
					// console.log(data)
					 //console.log(JSON.stringify(data))

					this.schools = data;
					resolve(this.schools);
				}).catch(err => reject(err));
			}
			else
				resolve(this.schools);
		});
		return promise;
	}


}