import { Injectable } from '@angular/core';

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

  getArray() {
    return this.arrayMatriz;
  }

  getMatrix() {
    return this.matrizSaida;
  }
}
