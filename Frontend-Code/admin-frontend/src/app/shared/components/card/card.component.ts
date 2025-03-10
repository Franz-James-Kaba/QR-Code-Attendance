import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';

export interface CardConfig {
  type: 'success' | 'analytics';
  title?: string;
  buttonText?: string;
  showCloseButton?: boolean;
  count?: number;
  subtitle?: string;
  icon?: string;
  detailsLink?: string;
}

@Component({
  selector: 'app-dynamic-card',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class DynamicCardComponent {
  @Input() config!: CardConfig;
  @Input() isModal: boolean = false;
  @Input() visible: boolean = true;

  @Output() buttonClick = new EventEmitter<void>();
  @Output() detailsClick = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onButtonClick(): void {
    this.buttonClick.emit();
  }

  onDetailsClick(): void {
    this.detailsClick.emit();
  }

  close(): void {
    this.closeModal.emit();
  }

  onClickOutside(): void {
    if (this.isModal) {
      this.closeModal.emit();
    }
  }
}
