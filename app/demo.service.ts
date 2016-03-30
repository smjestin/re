import { Injectable } from 'angular2/core';
import { Http, Headers, Response, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { Insurance } from './insurance';

@Injectable()
export class DemoService {

  constructor(private http:Http) { }

  private appraisalURL = 'http://54.175.15.171:3000/api/real_estates';
  private INSincURL = 'https://insinc.csci4145.mcstat.us/v1/quote';

  // Uses http.get() to load a single JSON file
  getAppraisals() {
    return this.http.get(this.appraisalURL).map((res:Response) => res.json());
  }
  
  submitINSincInfo(insurance: Insurance) {
  	let body = JSON.stringify(insurance);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});
	console.log(body);
    return this.http.post(this.INSincURL, body, options)
            .map((res:Response) => res.json());
  } 
  
  
}
