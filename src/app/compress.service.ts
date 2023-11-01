import { Injectable } from '@angular/core';
import { IResult } from './result-table/result-table.component';

@Injectable({
  providedIn: 'root'
})
export class CompressService {
  constructor() { }

  // creates a set and returns as a array to make easy to manipulate
  individual(message: string): string[] {
    return [...new Set(message.split(''))];
  }

  /* 
    - separates each character and creates a set to keep only one of each
    - iterates over each char to get how many times it exists in the original string
    - and then returns a string with the result of the whole original string
  */
  shrink(message: string): string {
    return this.individual(message).map(
      (char: string) => `${this.count(message, char)}${char}`
    ).join('');
  }

  // returns the number of times the `char` appears in the original string
  count(original: string, char: string): number {
    return original.split('').filter((item: string) => item === char).length;
  }

  stat(original: string, compressed: string): IResult {
    const percentage = 1 - (compressed.length / original.length);

    return {
      original,
      compressed,
      percentage,
    };
  }
}
