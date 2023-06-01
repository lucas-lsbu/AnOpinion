import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent implements OnInit {


  // label variables
  @Input() labelText?: string;

  // button variables
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
