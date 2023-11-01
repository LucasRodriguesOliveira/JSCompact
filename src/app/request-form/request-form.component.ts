import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ERequestStatus } from './request-status.enum';

export interface IRequestStatus {
  status: ERequestStatus;
  message: string;
}

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent {
  isLoading: boolean = false;

  @Output() requestDataEvent = new EventEmitter<string>();
  @Output() requestStatus = new EventEmitter<IRequestStatus>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly apiService: ApiService,
  ) { }

  requestDataForm = this.fb.group({
    quantity: [
      5,
      [
        Validators.required,
        Validators.min(1),
        Validators.pattern('\\d+')
      ],
    ],
  });

  onSubmit() {
    this.isLoading = true;
    const quantity: number = this.requestDataForm.value.quantity ?? 0;

    this.requestStatus.emit({
      status: ERequestStatus.PENDING,
      message: `${quantity}`,
    });

    for(let i = 0; i < quantity; i++) {
      this.apiService.getMessage().subscribe(
        (message: string) => {
          this.requestDataEvent.emit(message);

          if (i+1 === quantity) {
            this.isLoading = false;
            this.requestStatus.emit({
              status: ERequestStatus.FINISHED,
              message: 'ok',
            });
          }
        }
      );
    }
  }
}
