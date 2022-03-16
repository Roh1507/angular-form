import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.http.get<any>('http://localhost:3000/signupUsers')
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email == this.loginForm.value.email && a.password == this.loginForm.value.password;
        });
        if (user) {
          alert('Login successful')
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          alert("User not Found")
        }
      }, err => {
        console.log('Something went wrong');

      })
  }
}
