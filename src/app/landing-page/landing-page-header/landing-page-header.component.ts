import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-landing-page-header',
  templateUrl: './landing-page-header.component.html',
  styleUrls: ['./landing-page-header.component.scss']
})
export class LandingPageHeaderComponent implements OnInit,AfterViewInit {

  constructor(private _scrollService: ScrollService) { }

  @ViewChild('home') public home?: ElementRef ;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.home) {
      this._scrollService.setElementRefById('home',this.home)
    }
  }

}
