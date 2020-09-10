import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Subject } from 'rxjs'
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loading$: Subject<boolean>;
  constructor(public loaderService: LoaderService) {
    this.loading$ = this.loaderService.loader;
  }

  ngOnInit() {
  }

}
