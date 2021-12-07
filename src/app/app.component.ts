import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'rotate-table';
  lista='';
  save() {
    this.lista = '1,2,3,4,5,6,7,8,9'
    let arrInput = this.lista.split(',');
    if (Number.isInteger(Math.sqrt(arrInput.length))) {
      if (Math.sqrt(arrInput.length) % 2) {
        alert('impar')
      } else {
        alert('par')
      }
      console.log(arrInput);
    }
  }
}

