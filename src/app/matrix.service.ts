import { Injectable } from '@angular/core';
import { Matrix } from './matrix.model';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private arrayMatriz!: any[];
  private matrizSaida!: any[];
  constructor() { }

  setMatrix(arr: any, matrix: any) {
    this.arrayMatriz = arr;
    this.matrizSaida = matrix;
  }

  getMatrix() {
    return (this.arrayMatriz, this.matrizSaida);
  }
}
