import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatrixService } from '../matrix.service';

const ELEMENT_DATA: any[] = [1,2];
@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.sass']
})
export class SaidaComponent implements OnInit {
  arraySaida: any;
  matrizSaida: any;
  tipoSaida: string = '';
  matrizEntrada: any;
  display = 'listview';
  constructor(private route: Router, private matrixService: MatrixService
  ) { }

  ngOnInit(): void {
    this.arraySaida = this.matrixService.getOutputArray();
    this.matrizSaida = this.matrixService.getMatrix();
    this.matrizEntrada = this.matrixService.getInputArray();
    this.display = 'listview';
    // caso da tela inicial, retorne entrada inválida, some os campos que trazem mais detalhes sobre as matrizes
    if(this.matrizSaida === null || this.matrizSaida === undefined) {
      this.tipoSaida = '- Inválido '
      this.display = 'none';
    } else if (this.arraySaida !== undefined) {
      this.tipoSaida = '- Válido '
    } else {
      this.tipoSaida = 'Volte para a página anterior para inserir os dados ;)'
    }
  }

  dataSource = ELEMENT_DATA;
  
  voltar(){
    this.route.navigate(['']);
  }
}
