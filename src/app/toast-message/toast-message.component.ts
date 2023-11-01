import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EToastDuration } from './toast-duration.enum';
import { IToastOptions } from './toast-options.interface';
import { EToastPosition } from './toast-position.enum';
import { EToastType } from './toast-type.enum';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent implements OnInit, OnDestroy {
  @Input() options: IToastOptions = {
    title: '',
    position: EToastPosition.TOP_CENTER,
    duration: EToastDuration.TWO_SECONDS,
    isClosable: true,
    isFocusable: true,
  };

  @Input({ required: true }) message: string = '';
  @Input({ required: true }) type: EToastType = EToastType.INFO;

  @Output() canClose = new EventEmitter<boolean>();

  private timerIds: any[] = [];

  cardStyle: Record<string, string> = {};

  constructor() { }

  ngOnInit(): void {
    this.setCardStyle(-15, 0);

    const animationTimerId = setTimeout(() => {
      this.setCardStyle(15, 1);
    }, 50);

    this.timerIds.push(animationTimerId);

    this.autoClose();
  }

  ngOnDestroy(): void {
    this.timerIds.forEach((timerId: any) => {
      clearTimeout(timerId);
    });
  }

  setCardStyle(margin: number, opacity: number) {
    const position: string = this.options.position
      .toLowerCase()
      .includes('top') ? 'top' : 'bottom';

    this.cardStyle = {
      [`margin-${position}`]: `${margin}px`,
      opacity: `${opacity}`,
    };
  }

  close() {
    this.setCardStyle(-15, 0);
    const closeTimerId = setTimeout(() => {
      this.canClose.emit(true);
    }, 300);

    this.timerIds.push(closeTimerId);
  }

  autoClose() {
    if (this.options.duration >= 0) {
      const autoCloseTimerId = setTimeout(() => {
        this.close();
      }, this.options.duration);

      this.timerIds.push(autoCloseTimerId);
    }
  }
}
