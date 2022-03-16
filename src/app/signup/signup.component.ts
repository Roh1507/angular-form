import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      contact: ['',[Validators.required,Validators.pattern("^[0-9]{10,11}$")]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(11)]]
    })
  }

  signUp() {
    this.http.post<any>('http://localhost:3000/signupUsers', this.signupForm.value)
      .subscribe(res => {
        alert('SignUp Succesfull');
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, err => {
        alert('Something went wrong');
      })
  }
}
