import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslatorService } from 'src/app/core/services/translator.service';

@Component({
  selector: 'print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.css']
})
export class PrintErrorComponent implements OnInit {
  @Input() control: FormControl;
  @Input() patternMsg: string;

  constructor(public translate: TranslatorService) { }

  ngOnInit() {
  }



}
