import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser,faMapMarkerAlt, IconDefinition,faEnvelope, faPhone,} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faGithub, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { ScrollService } from '../services/scroll.service';
import { LandingPageConfigService } from '../services/landing-page-config.service';

@Component({
  selector: 'app-landing-page-footer',
  templateUrl: './landing-page-footer.component.html',
  styleUrls: ['./landing-page-footer.component.scss']
})
export class LandingPageFooterComponent implements OnInit,AfterViewInit {
  public icons:IconDefinition[] = [faUser,faMapMarkerAlt,faEnvelope,faPhone,faFacebookF, faGithub, faLinkedinIn]
  public readonly personFields;
  @ViewChild('footer') public footer?: ElementRef ;

  constructor(private readonly _scrollService: ScrollService,private readonly _landingPageConfigService:LandingPageConfigService) {
    this.personFields=this._landingPageConfigService.person
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.footer) {
      this._scrollService.setElementRefById('footer',this.footer)
    }
  }

}
