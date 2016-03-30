import {Component} from 'angular2/core';
import {DemoService} from './demo.service';
import {LoginFormComponent} from './login-form.component';
import { Appraisal }    from './appraisal';
import { Mortgage } from './mortgage';
import { Insurance } from './insurance';

@Component({
  selector: 'demo-app',
  templateUrl: 'app/appraisal-form.component.html'
})
export class AppComponent {

  public appraisals;
    
  active = true;
  valid = true;
  model = new Appraisal();
  mortgage = new Mortgage();
  submitted = false;
  
  constructor(private _demoService: DemoService) { }
  ngOnInit() { this.getAppraisals(); }
  
  getAppraisals() {
    this._demoService.getAppraisals().subscribe(
      data => { this.appraisals = data },
      err => console.error(err),
      () => console.log('done loading logins')
    );
  }
    
  onMlsIDSubmit() {
	var location = -1;
  	for(var i = 0; i < this.appraisals.length; i++) {
  		if(this.appraisals[i]["MlsId"] == this.model.mlsID) {
  			location = i;
  		}
  	}
  	if(location != -1) {
  		this.submitted = true;
  		this.loadModel(location);
  	}
  	else {
  		console.log("Property does not exist.");
  		valid = false;
  	}
  }
  
  loadModel(location: int) {
  	this.model.appraisal_value = this.appraisals[location]["appraisal_value"];
  }
  
  onINSincSubmit() {
  	let insurance = new Insurance();
  	insurance.mortId = this.mortgage.mortID;
  	insurance.value = this.model.appraisal_value;
  	this._demoService.submitINSincInfo(insurance).subscribe(
  		data => console.log('Data: ${data}'), 
  		err => err => console.error(err)
  	);
  }

}