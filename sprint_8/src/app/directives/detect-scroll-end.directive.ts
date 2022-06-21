import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDetectScrollEnd]'
})
export class DetectScrollEndDirective {
  

  @Output() endArrived = new EventEmitter();

  @HostListener('scroll', ['$event.target'])
  onScroll(element: HTMLElement){

    const isEnd = element.offsetHeight + element.scrollTop >= element.scrollHeight;

    if (isEnd) { this.endArrived.emit(true); }

  }
  
  constructor() { }

}
