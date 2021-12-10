import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private route: Router, private matrixService: MatrixService
  ) { }
  public i: number = 0; 
  public j: number = 0; 
  ngOnInit(): void {
    this.arraySaida = this.matrixService.getArray();
    this.matrizSaida = this.matrixService.getMatrix();
    if(this.matrizSaida === null) {
      this.tipoSaida = '- Inválido '
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
