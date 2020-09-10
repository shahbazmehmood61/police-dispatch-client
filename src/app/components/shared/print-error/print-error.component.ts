import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.css']
})
export class PrintErrorComponent implements OnInit {
  @Input() control: FormControl;
  @Input() patternMsg: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.control);
  }



}
