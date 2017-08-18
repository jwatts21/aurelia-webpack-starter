import {HttpClient as HttpFetch, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import * as R from "ramda";



let httpFetch = new HttpFetch();

function convert(response){
	return response.json()
}


function fetch(url){
	 return httpClient.fetch(url)   
}


function post(user,url){
  return function (){
	   return httpFetch.fetch(url,{
				method: 'POST',
				body: json(user)
       })
   }
}

@inject('apiRoot')
export class UserRepository{

	constructor(apiRoot) {
		this.apiRoot = apiRoot;
	}

    save(user){
        return R.composeP(convert, R.curry(post)(user)(`${this.apiRoot}text`))()
	}

	save2(user){
        return R.composeP(convert,post(user,this.apiRoot + 'text'))()
	}

}