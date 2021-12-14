import { Component, OnInit } from '@angular/core';
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
  // Bloco inicial de criação de variáveis
  title = 'rotate-table';
  listaEntrada: string = '';
  arraysRotacionados: any[] = [];
  matrizSaida: any[] = [];
  
  // Método utilizado ao clicar no botão rotacionar
  save() {
    var arraySaida, matrizEntrada;
    this.arraysRotacionados = [];
    this.matrizSaida = [];
    let arrInput = this.listaEntrada.split(',');

    // Validação de entradas inválidas no programa
    if (this.entradaInvalida(arrInput)){
      this.avancarTela (arrInput, null, null);
      return;
    }
    if (arrInput.length > 1) {
      var matrizRotacionada = this.transformarArrayEmMatriz(arrInput, Math.sqrt(arrInput.length));
      matrizEntrada = matrizRotacionada;
      this.rotacionarMatriz(matrizRotacionada);
      var tam = (this.arraysRotacionados[0].length+4)/4;
      this.matrizSaida = new Array(tam);
      // Prepara a matriz que será passada para a tela seguinte
      for (var i = 0; i < this.matrizSaida.length; i++) {
        this.matrizSaida[i] = new Array(tam);
      }

      // Percorre a matriz que contem os arrays rotacionados, a parte externa da matriz rotacionada em forma de array
      for (let i=0; i<this.arraysRotacionados.length; i++) {
        // variável que nos dirá quantas linhas e colunas  vão ter na matriz
        tam = (this.arraysRotacionados[i].length+4)/4;
        this.montarSaida(i, tam);
      }
      // caso seja uma matriz de número de linhas ou colunas ímpar, reatribui o termo central a matriz de saída
      if (Math.sqrt(arrInput.length) % 2) {
        this.matrizSaida[(this.matrizSaida.length-1)/2][(this.matrizSaida.length-1)/2] = arrInput[(arrInput.length-1)/2];
      }

      arraySaida = this.transformarMatrizEmArray(this.matrizSaida);
    } else {
      // caso seja uma matriz de um elemento apenas
      this.matrizSaida[0] = arrInput[0];
      arraySaida = arrInput[0];
      matrizEntrada = this.transformarArrayEmMatriz(arrInput, 1);
    }
    this.avancarTela (arraySaida, this.matrizSaida, matrizEntrada);
  }

  // Método que se comunica com o service para passar as informações necessárias a próxima tela
  avancarTela (arr: any, matrix: any, inArr: any) {
    this.matrixService.setMatrix(arr, matrix, inArr);
    this.route.navigate(['/saida']);
  }

  entradaInvalida (arr: any[]): boolean {
    var retorno = false;
    var aux = arr.filter(numero => (numero !== '' && !isNaN(numero)));
    if(this.listaEntrada === '' || aux.length === 0 || aux.length !== arr.length || 
      !Number.isInteger(Math.sqrt(arr.length))) {
      // alert ('erro');
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
  
  // Método responsável por rotacionar a matriz
  rotacionarMatriz (array1: any[][]) {
    let inicial: any[][] = array1;
    // Enquanto a matriz for de tamanho maior ou igual a 2 linhas e 2 colunas segue chamando o método
    if (array1.length > 1) {
      let aux = [];
      // Percorre as extremidades da matriz em análise, trocando os valores da matriz, realizando assim a rotação
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
      // Realização de poda na matriz para diminuí-la na chamada seguinte, fazendo assim uma execução "caracol" de fora para dentro
      inicial = inicial.map(function(val) {
        return val.slice(1, -1);
      });
      aux.unshift(aux.pop());
      inicial.splice(0,1);
      inicial.splice(inicial.length-1,1);
      this.arraysRotacionados.push(aux);

      this.rotacionarMatriz(inicial);
    }
  }
  
  // Método responsável por organizar a matriz que será levada a próxima tela
  montarSaida (index: number, tam: number) {
    let percorrePrimLinha, percorreUltiCol, percorreUltiLinha, percorrePrimCol, auxRotacionado = 0;
    for (percorrePrimLinha=index; percorrePrimLinha<index+tam; percorrePrimLinha++) {
      this.matrizSaida[index][percorrePrimLinha] = this.arraysRotacionados[index][auxRotacionado];
      auxRotacionado++;
    }
    for (percorreUltiCol=percorrePrimLinha; percorreUltiCol<percorrePrimLinha+tam-1; percorreUltiCol++) {
      this.matrizSaida[percorreUltiCol-tam+1][tam-1+index] = this.arraysRotacionados[index][auxRotacionado];
      auxRotacionado++;
    }
    let auxSaida = tam-2+index;
    for (percorreUltiLinha=percorreUltiCol; percorreUltiLinha<percorreUltiCol+tam-1; percorreUltiLinha++) {
      this.matrizSaida[tam-1+index][auxSaida] = this.arraysRotacionados[index][auxRotacionado];
      auxSaida--;
      auxRotacionado++;
    }
    auxSaida = tam-2+index; 
    for (percorrePrimCol=percorreUltiLinha; percorrePrimCol<percorreUltiLinha+tam-2; percorrePrimCol++) {
      this.matrizSaida[auxSaida][index] = this.arraysRotacionados[index][auxRotacionado];
      auxSaida--;
      auxRotacionado++;
    }
  }
}
