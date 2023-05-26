import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  isRegister?: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {


  }
  

  // checking if it is currently on '/auth/register' or '/auth/login'
  // to show login or register content
  ngOnInit(): void {
    this.isRegister = this.route.snapshot.routeConfig?.path == 'register' ? true : false;
    console.log(this.isRegister)
  }

}
