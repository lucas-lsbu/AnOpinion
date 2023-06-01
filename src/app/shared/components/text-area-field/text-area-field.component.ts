import { Component, Input, OnInit } from '@angular/core';

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
  

  constructor() { }

  ngOnInit() {
  }

}
