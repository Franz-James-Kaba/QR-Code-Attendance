import { Directive, ElementRef, Output, EventEmitter, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective implements OnInit {
  @Output() clickOutside = new EventEmitter<void>();
  private isInitialized = false;

  constructor(private readonly elementRef: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.isInitialized = true;
    }, 100);
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any): void {
    // Only process clicks after initialization
    if (!this.isInitialized) return;

    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
