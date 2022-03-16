import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './emp-dashboard.model';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName:['',[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/ )]],
      lastName: ['',[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/ )]],
      email: ['',[Validators.required,Validators.email]],
      contact: ['',[Validators.required,Validators.pattern("^[0-9]{10,11}$")]],
      salary: ['',[Validators.required,Validators.pattern("^[0-9]{3,6}$")]]
    })
    this.getEmployeeDetails()
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;  
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe((res) => {
        console.log(res);
        alert('Employee added sucessfully');
        let reff = document.getElementById("cancel")
        reff?.click()
        this.formValue.reset();
        this.getEmployeeDetails();

      },
        (err) => {
          alert("Something went wrong" + err);
        })
  }

  getEmployeeDetails() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

  deleteEmployeeDetails(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee details deleted");
        this.getEmployeeDetails();
      })
  }

  onEdit(row: any) {
    this.showAdd=false;
    this.showUpdate=true;    
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['salary'].setValue(row.salary);

  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Updated Succesfully");
        let reff = document.getElementById("cancel")
        reff?.click()
        this.formValue.reset();
        this.getEmployeeDetails();
      })
  }
}
