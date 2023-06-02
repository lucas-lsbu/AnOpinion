import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area-field',
  templateUrl: './text-area-field.component.html'
})
export class TextAreaFieldComponent implements OnInit {

    // label variables
    @Input() labelText?: string;

    // button variables
    @Input() required: boolean = false;
    @Input() name: string = '';
    @Input() placeholder: string = '';
    @Input() control!: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
