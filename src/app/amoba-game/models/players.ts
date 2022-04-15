import { Player } from "./player";

export class Playerek{
  private readonly _players: Player[]=[];

  constructor(players: Player[]){
    this._players = players;
  }

  private removePlayerById(id:number):void{ // playerekFelhasznált-ból kivesz és beleteszi a playerekbe vissza
    this._players.filter(player => player.id !== id)
  }

  private addPlayer(player:Player){  // playerekfelhasználtba rakunk 1 playert  a playerekből kivesszük
    this._players.push(player);
  }

  private getPlayerById(id:number):Player | undefined{  // segéd fgv
    return this._players.find(player => player.id === id)
  }

  // getPlayerNext(aktplayer){ // player cseréhez kell
  //     var hova=this.getPlayerOfId(aktplayer.id)
  //     var index=aktplayer.id+1;
  //     this.playerek[aktplayer.id]=aktplayer;
  //     while(this.playerek[index]===null || this.playerek[index]===undefined)
  //     {
  //         if(index>this.playerek.length){
  //             index=0;
  //         }else{
  //             index++;
  //         }
  //     }
  //     this.playerekFelhasznált[hova]=this.playerek[index];
  //     this.playerek[index]=null;
  // }

}
