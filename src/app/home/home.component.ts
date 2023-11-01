import { Component } from '@angular/core';
import { CompressService } from '../compress.service';
import { IRequestStatus } from '../request-form/request-form.component';
import { ERequestStatus } from '../request-form/request-status.enum';
import { IResult } from '../result-table/result-table.component';
import { EToastDuration } from '../toast-message/toast-duration.enum';
import { IToastOptions } from '../toast-message/toast-options.interface';
import { EToastPosition } from '../toast-message/toast-position.enum';
import { EToastType } from '../toast-message/toast-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  results: IResult[] = [];

  toastType: EToastType = EToastType.INFO;
  showToast: boolean = false;
  toastOptions: IToastOptions = {
    title: '',
    duration: EToastDuration.ONE_SECOND,
    isClosable: true,
    isFocusable: true,
    position: EToastPosition.TOP_CENTER,
  };
  toastMessage: string = '';

  constructor(private readonly compressService: CompressService) { }

  compressMessage(message: string) {
    const compressed: string = this.compressService.shrink(message);
    const result: IResult = this.compressService.stat(message, compressed);

    this.results.push(result);
  }

  reset() {
    this.results = [];
  }

  createRaw() {
    console.log(this.results);
    console.table(this.results);
    this.publishToast({
      status: ERequestStatus.FINISHED,
      message: 'ok',
    }, 'Dados gerados no Console. Abra com F12 ou CTRL+SHIFT+I');
  }

  publishToast({ status, message }: IRequestStatus, toastMessage: string = '') {
    if (status === ERequestStatus.PENDING) {
      this.toastType = EToastType.INFO;
      this.toastOptions = {
        title: 'Loading...',
        duration: EToastDuration.TWO_SECONDS,
        isClosable: true,
        isFocusable: true,
        position: EToastPosition.TOP_RIGHT,
      };
      this.toastMessage = toastMessage.length > 0
        ? toastMessage
        : `Buscando ${message} resultados da API.`;
      this.showToast = true;
    }

    if (status === ERequestStatus.FINISHED) {
      this.showToast = false;
      this.toastType = EToastType.SUCCESS;
      this.toastOptions = {
        title: 'Sucesso!',
        duration: EToastDuration.FIVE_SECONDS,
        isClosable: true,
        isFocusable: true,
        position: EToastPosition.TOP_RIGHT,
      };
      this.toastMessage = toastMessage.length > 0
        ? toastMessage
        : `Todos resultados carregados com sucesso.`;
      this.showToast = true;
    }
  }

  closeToast() {
    this.showToast = false;
  }
}
