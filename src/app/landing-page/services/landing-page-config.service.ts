import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandingPageConfigService {

  private readonly _navbar: { id: string; text: string; } = { id: "navbar", text: "Navbár" };
  private readonly _navbuttons: { id: string; text: string; }[] = [
    { id: "home", text: "Home" },
    { id: "about", text: "Rólam" },
    { id: "skills", text: "Tapasztalat" },
    { id: "works", text: "Munkáim" },
    { id: "footer", text: "Kapcsolat" }
  ];

  private readonly _person: { key: string; value: string; }[] = [
    { key: "Név", value: "Ballér Pál Krisztián" },
    { key: "Cím", value: "Magyarország, Balatonlelle" },
    { key: "Email", value: "baller.krisztian@gmail.com" },
    { key: "Telefonszám", value: "06/70-539-7536" }
  ];

  private readonly _about: { title: string; text: string; } = {
    title: "Egy Junior Front-End fejlesztő",
    text: ` BME-n végeztem, mint villamosmérnök, továbbá elvégeztem a Progmasters
            Junior Front-End fejlesztő képzését.
            Jól helytállok csapatban és egyedül is, igényes, precíz, pontos munkát végzek.
            Jó analitikus és problémamegoldó képességgel rendelkezem.
            Matek és az algoritmizálás mindig is közel álltak hozzám.
            A "growth mindset" szemléletet vallom,
            szeretek új dolgokat tanulni.
            Olyan munkakörnyezetbe szeretnék dolgozni,
            ahol kamatoztathatom az eddig megszerzett tudásomat és
            folyamatosan fejlődhetek, hogy kimagasló szakember lehessek.`
  };

  private readonly _skills: { id?: string; text: string; value: number; }[] = [
    { id: "HTML5", text: "HTML5", value: 90 },
    { id: "CSS, SCSS", text: "CSS, SCSS", value: 83 },
    { id: "Bootstrap", text: "Bootstrap", value: 90 },
    { id: "JavaScript", text: "JavaScript", value: 95 },
    { id: "TypeScript", text: "TypeScript", value: 97 },
    { id: "Angular", text: "Angular", value: 85 },
    { id: "RxJS, NgRx", text: "RxJS, NgRx", value: 70 },
    { id: "SQL, NoSQL", text: "SQL, NoSQL", value: 60 },
  ];

  private readonly _projects: { id: string; url: string; text: string; imgSrc: string; }[] = [
    { id: "1", url: 'snake', text: "Snake", imgSrc: "../../../assets/imgs/snake3.jpg" },
    { id: "2", url: 'amoba', text: "Amőba", imgSrc: "../../../assets/imgs/én_1.jpeg" },
    { id: "3", url: 'snake', text: "Snake", imgSrc: "../../../assets/imgs/snake3.jpg" }
  ];

  public get projects(): { id: string; url: string; text: string; imgSrc: string; }[] {
    return this._projects;
  }

  public get skills(): { id?: string; text: string; value: number; }[] {
    return this._skills;
  }

  public get about(): { title: string; text: string; } {
    return this._about;
  }

  public get person(): { key: string; value: string; }[] {
    return this._person;
  }

  public get navbuttons(): { id: string; text: string; }[] {
    return this._navbuttons;
  }
  public get navbar(): { id: string; text: string; } {
    return this._navbar;
  }

  constructor() { }
}
