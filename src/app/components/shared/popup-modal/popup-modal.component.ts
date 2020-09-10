import { Component, OnInit, Input } from '@angular/core';
import { DarkmodeService } from 'src/app/core/services/darkmode.service';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css'],
})
export class PopupModalComponent implements OnInit {
  @Input() modalHeading: string;
  @Input() popupModalName: string;
  report;

  constructor(
    public darkmode: DarkmodeService,
  ) { }

  ngOnInit() {
  }

}
