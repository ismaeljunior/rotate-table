import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.sass']
})
export class SaidaComponent implements OnInit {

  constructor(private route: ActivatedRoute,
) { }

  ngOnInit(): void {
  }

}
