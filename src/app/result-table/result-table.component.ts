import { Component, Input } from '@angular/core';

export interface IResult {
  original: string;
  compressed: string;
  percentage: number;
}

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent {
  @Input({ required: true }) data: IResult[] = [];
}
