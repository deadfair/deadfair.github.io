import { Link } from "./link";

export class LinkedList<T>{

  protected _head: Link<T> | null = null;
  protected _tail: Link<T> | null = null;
  private _length: number = 0;

  public get head(): Link<T> | null {
    return this._head;
  }
  public set head(value: Link<T> | null) {
    this._head = value;
  }
  public get tail(): Link<T> | null {
    return this._tail;
  }
  public set tail(value: Link<T> | null) {
    this._tail = value;
  }
  public get length(): number {
    return this._length;
  }


  constructor(head?:T){
    if (head) {
      const link = new Link<T>(head);
      this._tail=link;
      this._head=link
      this._length++
    }
  }

  public push(value:T):void{
    const link = new Link<T>(value);
    if (this._head && this._tail && this._tail!==this._head) {
        this._tail.next = link;
        link.previous=this._tail;
    }else if (this._head && this._tail && this._tail===this._head){
        this._head.next = link;
        link.previous=this._head;
    }else if (this._head===null && this._tail===null){
      this._head=link
    }
    this._length++
    this._tail=link;
  }

  public shift(): T | null{
    if (this._head) {
      const temp:Link<T> = this._head
      this._length--
      if (this._head.next!==null) {
        this._head=this._head.next
        this._head.previous=null
      }
      return temp.value
    }
    return null
  }

  public pop(): T | null{
    if (this._tail) {
      const temp = this._tail
      this._length--;
      if (this._tail.previous) {
        this._tail.previous.next  = null
        this._tail=this._tail.previous
      }
      return temp.value
    }
    return null
  }
}








