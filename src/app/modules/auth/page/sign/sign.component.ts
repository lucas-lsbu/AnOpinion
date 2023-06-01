import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  isRegister: boolean = true;
  error?: string;

  signForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    confirmPassword: new FormControl('')
  })
  
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private auth: AuthService) {

  }

  // checking if it is currently on '/auth/register' or '/auth/login'
  // to show login or register content
  ngOnInit(): void {
    this.isRegister = this.route.snapshot.routeConfig?.path == 'register' ? true : false;
  }

  onSubmit() {
    // check if form is valid
    if (this.isRegister && this.signForm.controls.confirmPassword.value != this.signForm.controls.password.value) {
      this.error = "PLEASE MAKE SURE PASSWORDS MATCH!";
      return;
    }
    console.log("Submit worked")
    // now check if register or login and perform appropriate action
    if (this.isRegister) {
      this.auth.signUp(this.signForm.controls.email.value!, this.signForm.controls.password.value!)
    }
  }

}
