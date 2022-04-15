import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CanvasOptions } from '../../interfaces/canvasoptions';
import { AISnake } from '../../models/aisnake';
import { Point } from '../../models/point';
import { Snake } from '../../models/snake';
import { SnakeConfigService } from '../../services/snake-config.service';

@Component({
  selector: 'app-snake-canvas',
  templateUrl: './snake-canvas.component.html',
  styleUrls: ['./snake-canvas.component.scss']
})
export class SnakeCanvasComponent implements OnInit, AfterViewInit {

  @Output() difficultyChange: EventEmitter<string> = new EventEmitter();
  @Output() modeChange: EventEmitter<string> = new EventEmitter();
  @Output() scoreChange: EventEmitter<number> = new EventEmitter();

  @Input() gameClickHeandler?: EventEmitter<string>;
  @Input() difficultyClickHeandler?: EventEmitter<string>;
  @Input() modeClickHeandler?: EventEmitter<string>;

  private difficultyID: string;
  private gameModeID:string;
  private readonly canvasOptions:CanvasOptions;
  private snake?: AISnake | Snake
  private ctx?: CanvasRenderingContext2D;
  private apple: Point
  private timerId: any
  private score: number = 0;
  private difficultyCanChange: boolean = true;
  private modeCanChange: boolean = true;
  private gameIsStay: boolean = true;
  private _gameIsOver: boolean = false;
  get gameIsOver(): boolean { return this._gameIsOver; }
  @ViewChild('canvas', { static: false }) public canvas!: ElementRef;

  constructor(private readonly _snakeConfigService : SnakeConfigService) {
    this.difficultyID = this._snakeConfigService.difficultys[0].id
    this.gameModeID = this._snakeConfigService.gameModes[0].id
    this.canvasOptions= this._snakeConfigService.canvasOptions
    this.apple = this.createApple()
    this.snakeInit()
  }

  ngOnInit(): void {
    this.gameClickHeandler?.subscribe((state) => { this.gameStateClickHeandler(state) })
    this.difficultyClickHeandler?.subscribe((id) => {
      this.difficultyID = id
      if (this.difficultyCanChange) {
        this.difficultyChange.emit(this.difficultyID)
      }
    })
    this.modeClickHeandler?.subscribe((id) => {
      this.gameModeID = id
      if (this.modeCanChange) {
        this.modeChange.emit(this.gameModeID)
      }
    })
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvasSizeInit()
    this.canvasRender();
    this.snakeRender();
    this.scoreRender();
    Promise.resolve().then(() => {this.difficultyChange.emit(this.difficultyID)})
    Promise.resolve().then(() => {this.modeChange.emit(this.gameModeID)})
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.snake?.directionListener(event)
  }

  private canvasSizeInit(): void {
    this.canvas.nativeElement.height = this.canvasOptions.sizes.height
    this.canvas.nativeElement.width = this.canvasOptions.sizes.width
  }

  private appleInit():void {
    let apple = this.createApple()
    // 90% pályaterítettségnél ~10% a valószínűsége hogy 22x elrontjuk a dobást egymás után
    while (this.snake?.isPointInBody(apple)) {
      apple = this.createApple()
    }
    this.apple = apple
    if (this.snake instanceof AISnake) {
      this.snake.calculateRoad(apple)
    }
  }

  private createApple():Point {
    const x = Math.floor(Math.random() * (this.canvasOptions.sizes.width) / this.canvasOptions.sizes.boxUnit) * this.canvasOptions.sizes.boxUnit
    const y = Math.floor(Math.random() * (this.canvasOptions.sizes.height) / this.canvasOptions.sizes.boxUnit) * this.canvasOptions.sizes.boxUnit
    return new Point(x, y)
  }

  private gameStateClickHeandler(value: string): void {
    switch (value) {
      case "start": this.start();
        break;
      case "restart": this.restart();;
        break;
      case "pause": if (!this.gameIsStay) { this.pause(); }
        break;
      default:
        break;
    }
  }

  private setFrequency(): void {
    clearInterval(this.timerId)
    this.timerId = setInterval(() => {
      this.snakeMove()
      this.render();
    }, this.calcFrequency());
  }

  private calcFrequency():number {
    if (!this.snake) {
      return 0;       // ha nincs kígyó akkor értelmetlen
    }
    return Math.floor(1 / this.snake.speed * 1000)
  }

  private snakeMove(): void {
    this.snake?.move()
    if (this.isGameOver()) {
      clearInterval(this.timerId)
      this.gameOver()
    }
    if (this.snake?.checkEating(this.apple)) {
      this.snakeEating(this.apple)
    }
  }

  private snakeEating(apple: Point): void {
    this.snake?.eating(apple)
    this.score++;
    this.setFrequency()
    this.appleInit()
  }

  private render():void {
    this.canvasRender();
    this.appleRender();
    this.snakeRender();
    this.scoreRender();
  }

  private canvasRender():void {
    if (this.ctx) {
      this.ctx.fillStyle = this.canvasOptions.colors.background;
      this.ctx.fillRect(0, 0, this.canvasOptions.sizes.width, this.canvasOptions.sizes.height);
    }
  }
  private appleRender():void {
    if (this.ctx) {
      this.ctx.fillStyle = this.canvasOptions.colors.apple
      this.ctx.fillRect(this.apple.x, this.apple.y, this.canvasOptions.sizes.boxUnit, this.canvasOptions.sizes.boxUnit)
    }
  }
  private snakeRender():void {
    if (this.ctx && this.snake) {
      for (const snakeBodyUnite of this.snake.body) {
        this.ctx.fillStyle = this.canvasOptions.colors.snake
        this.ctx.fillRect(snakeBodyUnite.x, snakeBodyUnite.y, this.canvasOptions.sizes.boxUnit, this.canvasOptions.sizes.boxUnit)
      }
    }
  }
  private scoreRender():void {
    this.scoreChange.emit(this.score)
  }

  private isGameOver(): boolean {
    if (!this.snake) {
      return true   // ha nicns kígyó a játéknak vége.
    }
    return this.isCollisionInWall() || this.snake.checkEatingMyTail()
  }

  private isCollisionInWall():boolean {
    if (!this.snake) {
      return false  // ha nincs kígyó akkor nem is ütközhet
    }
    return this.snake.getHead().x < 0 ||
      this.snake.getHead().y < 0 ||
      this.snake.getHead().x >= this.canvasOptions.sizes.width ||
      this.snake.getHead().y >= this.canvasOptions.sizes.height
  }

  private gameOver():void {
    this.gameIsStay = true;
    this._gameIsOver = true;
    this.difficultyCanChange = true;
    this.modeCanChange = true;
  }

  private start(): void {
    if (this.modeCanChange) {
      this.snakeInit()
    }
    if (this.gameIsStay && !this._gameIsOver && this.snake) {
      this.difficultyChange.emit(this.difficultyID)
      this.snake.difficultyChange(this.difficultyID)
      this.continue()
    }
  }

  private continue(): void {
    this.setFrequency();
    this.gameIsStay = false;
    this.difficultyCanChange = false
    this.modeCanChange = false
  }

  private restart():void {
    this.difficultyCanChange = true
    this.modeCanChange = true
    this._gameIsOver = false
    this.pause()
    this.score = 0;
    this.snakeInit()
    this.appleInit();
    this.canvasRender();
    this.snakeRender();
    this.scoreRender();
  }

  private snakeInit():void {
    if (this.gameModeID === "player") {
      this.snake = new Snake(this.difficultyID, this.canvasOptions.sizes,this._snakeConfigService.difficultys);
      return
    }
    if (this.gameModeID === "ai") {
      this.snake = new AISnake(this.difficultyID, this.canvasOptions.sizes,this._snakeConfigService.difficultys);
      const tempsnake = this.snake as AISnake;
      tempsnake.calculateRoad(this.apple)
      return
    }
    this.snake = new Snake(this.difficultyID, this.canvasOptions.sizes,this._snakeConfigService.difficultys);
  }

  private pause():void {
    clearInterval(this.timerId)
    this.gameIsStay = true
  }
}
