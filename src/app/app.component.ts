import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'rotate-table';
  lista: string = '';
  save() {
    let aa = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
    let arrInput = this.lista.split(',');
    if (arrInput.length > 0) {
      var a = arrInput.length;
      if (Number.isInteger(Math.sqrt(arrInput.length))) {
        if (Math.sqrt(arrInput.length) % 2) {
          // alert('impar')
        } else {
          // alert('par')
        }
        this.percorrer(aa, aa, aa.length);
        console.log(arrInput);
      }
    }
  }
  percorrer (array1: any[][], resultante: any[], tam: any) {
    if (array1.length > 0) {
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
      aux.unshift(aux.pop());
      console.log(aux);
    }
  }
}

