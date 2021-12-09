import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  constructor(private route: Router, private matrixService: MatrixService) { }

  ngOnInit(): void {
  }

  mailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();
  title = 'rotate-table';
  lista: string = '';
  arrayRotacionado: any[] = [];
  matrizSaida: any[] = [];
  save() {
    let aa3 = [[1,2,3],[4,5,6],[7,8,9]];
    let aa4 = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
    let aa5 = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],
    [21,22,23,24,25]];
    let aa6 = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24],
    [25,26,27,28,29,30],[31,32,33,34,35,36]];
    /* 
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49
    */
    this.arrayRotacionado = [];
    this.matrizSaida = [];

    let arrInput = this.lista.split(',');
    if (this.entradaInvalida(arrInput)){
      return;
    }
    var arraySaida;
    if (arrInput.length > 1) {
      var matrizEntrada = this.transformarArrayEmMatriz(arrInput, Math.sqrt(arrInput.length));
      this.percorrer(matrizEntrada);
      var tam = (this.arrayRotacionado[0].length+4)/4;
      this.matrizSaida = new Array(tam);
      for (var i = 0; i < this.matrizSaida.length; i++) {
        this.matrizSaida[i] = new Array(tam);
      }
      //-----------------------------------------------------
      for (let i=0; i<this.arrayRotacionado.length; i++) {
        tam = (this.arrayRotacionado[i].length+4)/4;
        this.montarSaida(i, tam);
      }
      
      if (Math.sqrt(arrInput.length) % 2) {
        this.matrizSaida[(this.matrizSaida.length-1)/2][(this.matrizSaida.length-1)/2] = arrInput[(arrInput.length-1)/2];
      }

      arraySaida = this.transformarMatrizEmArray(this.matrizSaida);
      // var tamInicial = (aux.length+4)/4;
    } else {
      this.matrizSaida[0] = arrInput[0];
      arraySaida = arrInput[0];
    }
    this.matrixService.setMatrix(arraySaida, this.matrizSaida);
    this.route.navigate(['/saida']);
    console.log(arrInput);
  }

  entradaInvalida (arr: any[]): boolean {
    var retorno = false;
    var aux = arr.filter(numero => (numero !== '' && !isNaN(numero)));
    if(this.lista === '' || aux.length === 0 || aux.length !== arr.length || 
      !Number.isInteger(Math.sqrt(arr.length))) {
      alert ('erro');
      retorno = true;
    }
    return retorno;
  }

  transformarArrayEmMatriz (arr: any[], tam: number): any {
    let aux = 0, retorno = new Array(tam);
    for (var i = 0; i < retorno.length; i++) {
      retorno[i] = new Array(tam);
    }

    for (let i=0; i<tam; i++) {
      for (let j=0; j<tam; j++) {
        retorno[i][j] = arr[aux];
        aux++;
      }
    }
    return retorno;
  }

  transformarMatrizEmArray (matrix: any[][]): any[] {
    let retorno = [];
    for (let i=0; i<matrix.length; i++) {
      for (let j=0; j<matrix.length; j++) {
        retorno.push(matrix[i][j]);
      }
    }
    return retorno;
  }

  percorrer (array1: any[][]) {
    let inicial: any[][] = array1;
    if (array1.length > 1) {
      let aux = [];
      for (let j=0; j<array1.length-1; j++) {
        aux.push(array1[0][j]);
        if (j != array1.length - 1) {
        } 
      }
      for (let i=0; i<array1.length-1; i++) {
        aux.push(array1[i][array1.length-1]);
        if (i !=array1.length - 1) {
        } 
      }
      for (let j=array1.length-1; j>0; j--) {
        aux.push(array1[array1.length-1][j]);
      }
      for (let i=array1.length-1; i>0; i--) {
        aux.push(array1[i][0]);
      }
      inicial = inicial.map(function(val) {
        return val.slice(1, -1);
      });
      aux.unshift(aux.pop());
      inicial.splice(0,1);
      inicial.splice(inicial.length-1,1);
      this.arrayRotacionado.push(aux);

      this.percorrer(inicial);
      console.log(aux);
    }
  }

  montarSaida (index: number, tam: number) {
    let primLinha, ultiCol, ultiLinha, primCol, auxRotacionado = 0;
    for (primLinha=index; primLinha<index+tam; primLinha++) {
      this.matrizSaida[index][primLinha] = this.arrayRotacionado[index][auxRotacionado];
      auxRotacionado++;
    }
    for (ultiCol=primLinha; ultiCol<primLinha+tam-1; ultiCol++) {
      this.matrizSaida[ultiCol-tam+1][tam-1+index] = this.arrayRotacionado[index][auxRotacionado];
      auxRotacionado++;
    }
    let auxSaida = tam-2+index;
    for (ultiLinha=ultiCol; ultiLinha<ultiCol+tam-1; ultiLinha++) {
      this.matrizSaida[tam-1+index][auxSaida] = this.arrayRotacionado[index][auxRotacionado];
      auxSaida--;
      auxRotacionado++;
    }
    auxSaida = tam-2+index; 
    for (primCol=ultiLinha; primCol<ultiLinha+tam-2; primCol++) {
      this.matrizSaida[auxSaida][index] = this.arrayRotacionado[index][auxRotacionado];
      auxSaida--;
      auxRotacionado++;
    }
  }
}
