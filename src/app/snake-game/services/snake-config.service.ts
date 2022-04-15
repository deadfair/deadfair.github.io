import { Injectable } from '@angular/core';
import { CanvasOptions } from '../interfaces/canvasoptions';
import { Difficulty } from '../interfaces/difficulty';
import { GameMode } from '../interfaces/gamemode';

@Injectable({
  providedIn: 'root'
})
export class SnakeConfigService {

  private readonly _difficultys: Difficulty[] = [
    { id: "easy", text: "Easy", speed: 2, acceleration: 0.2 },
    { id: "normal", text: "Normal", speed: 10, acceleration: 1 },
    { id: "hard", text: "Hard", speed: 30, acceleration: 3 },
    { id: "impossible", text: "Impossible", speed: 400, acceleration: 0 }
  ];

  private readonly _canvasOptions: CanvasOptions = {
    colors: { background: "darkgray", snake: "black", apple: "green" },
    sizes: { width: 500, height: 400, boxUnit: 10 }
  };

  private readonly _gameModes: GameMode[] = [
    { id: "player", text: "Player" },
    { id: "ai", text: "AI" }
  ];


  getGameModeTextById(id: string): string {
    const result = this._gameModes.find(mode => mode.id === id)
    return result ? result.text : "";
  }
  getDifficultyTextById(id: string): string {
    const result = this._difficultys.find(diff => diff.id === id)
    return result ? result.text : "";
  }

  public get gameModes(): GameMode[] {
    return this._gameModes;
  }

  public get canvasOptions(): CanvasOptions {
    return this._canvasOptions;
  }

  public get difficultys(): Difficulty[] {
    return this._difficultys;
  }

  constructor() { }
}
