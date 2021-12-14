import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private arrayMatriz!: any[];
  private matrizSaida!: any[];
  private arrayEntrada!: any[];

  constructor() { }

  setMatrix(outArr: any, matrix: any, inArr: any) {
    this.arrayMatriz = outArr;
    this.matrizSaida = matrix;
    this.arrayEntrada = inArr;
  }

  getOutputArray() {
    return this.arrayMatriz;
  }

  getInputArray() {
    return this.arrayEntrada;
  }

  getMatrix() {
    return this.matrizSaida;
  }
}
