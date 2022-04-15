import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { RefElement } from '../../models/refElement';
import { LandingPageConfigService } from './landing-page-config.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private readonly _navbar:RefElement;
  private readonly _refElements:RefElement[] = []

  get refElements():RefElement[]{return this._refElements}

  constructor(@Inject(DOCUMENT) private _document: Document,private _window: Window,private readonly _landingPageConfigService:LandingPageConfigService) {
    this._landingPageConfigService.navbuttons.forEach(refElement => this._refElements.push(new RefElement(refElement.id,refElement.text)))
    this._navbar = new RefElement(this._landingPageConfigService.navbar.id,this._landingPageConfigService.navbar.text)
  }

  setElementRefById(id:string,elementRef:ElementRef):void{
    const element: RefElement | undefined = this._refElements.find(e => e.id === id)
    if (element!==undefined) {
      element.elementRef=elementRef
    }
  }

  setNavbarElementRef(elementRef:ElementRef):void{
    this._navbar.elementRef=elementRef
  }

  getRefElementByLinkName(text:string):RefElement | undefined{
    return this._refElements.find(e => e.text === text)
  }

  scrollByLinkName(text:string): void{

    const refElement:RefElement | undefined = this.getRefElementByLinkName(text)

    if (this._navbar.elementRef===undefined || this._navbar.elementRef===null || refElement===undefined || refElement.elementRef===undefined) {
      return;
    }
    const offset:number = this._navbar.elementRef.nativeElement.clientHeight;
    const bodyRect:number =  this._document.body.getBoundingClientRect().top;
    const elementRect:number = refElement.elementRef.nativeElement.getBoundingClientRect().top;
    const elementPosition:number = elementRect - bodyRect;
    const offsetPosition:number = elementPosition - offset;

    this._window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

}
