import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.sass']
})
export class SaidaComponent implements OnInit {
  arraySaida: any;
  matrizSaida: any;
  constructor(private route: Router, private matrixService: MatrixService
  ) { }

  ngOnInit(): void {
    this.arraySaida, this.matrizSaida = this.matrixService.getMatrix();
    var a =0;
  }

  voltar(){
    this.route.navigate(['']);
  }
}
