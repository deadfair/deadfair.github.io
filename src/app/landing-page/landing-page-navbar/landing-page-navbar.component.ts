import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-landing-page-navbar',
  templateUrl: './landing-page-navbar.component.html',
  styleUrls: ['./landing-page-navbar.component.scss']
})
export class LandingPageNavbarComponent implements OnInit, AfterViewInit {

  public linkNames: string[] = [];
  @ViewChild('navbar') public navbar?: ElementRef ;

  constructor(private _scrollService: ScrollService) { }

  ngOnInit(): void {
    this._scrollService.refElements.forEach(refElement=>{
      this.linkNames.push(refElement.text)
    })
  }

  ngAfterViewInit(): void {
    if (this.navbar) {
      this._scrollService.setNavbarElementRef(this.navbar)
    }
  }

  scroll(event:Event): void{
    event.preventDefault()

    const target = event.target as HTMLElement;
    let linkName = target.innerText

    this._scrollService.scrollByLinkName(linkName)
  }
}
