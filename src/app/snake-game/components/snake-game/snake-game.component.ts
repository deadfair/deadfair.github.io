import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Difficulty } from '../../interfaces/difficulty';
import { GameMode } from '../../interfaces/gamemode';
import { SnakeConfigService } from '../../services/snake-config.service';


@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit {

  public difficultys:Difficulty[]
  public modes:GameMode[]
  public difficulty:string="";
  public mode:string=""
  public score:number=0;
  public gameClickHeandler: EventEmitter<string> = new EventEmitter();
  public difficultyClickHeandler: EventEmitter<string> = new EventEmitter();
  public modeClickHeandler: EventEmitter<string> = new EventEmitter();
  @ViewChild('start') public start!: ElementRef ;

  constructor(private _window: Window,private readonly _snakeConfigService : SnakeConfigService) {
    this.modes = _snakeConfigService.gameModes
    this.difficultys = _snakeConfigService.difficultys
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.underMdSizeCollapseMenu(this.start)
  }

  onGameStateClick(newState: string): void{
    this.gameClickHeandler.emit(newState);
  }

  onDifficultyClick(id: string): void{
    this.difficultyClickHeandler.emit(id);
  }

  onModeClick(id: string): void{
    this.modeClickHeandler.emit(id);
  }

  difficultyChange(id:string):void{
    this.difficulty = this._snakeConfigService.getDifficultyTextById(id)
  }

  modeChange(id:string):void{
    this.mode = this._snakeConfigService.getGameModeTextById(id)
  }

  scoreChange(value:number): void{
    this.score = value
  }

  private underMdSizeCollapseMenu(element:ElementRef):void{
    const mediaQuery = this._window.matchMedia('(max-width: 767.98px)')
    if (mediaQuery.matches) {
      element.nativeElement.setAttribute("data-bs-target","#navbarSupportedContent" )
      element.nativeElement.setAttribute("data-bs-toggle","collapse" )
    }
  }
}
