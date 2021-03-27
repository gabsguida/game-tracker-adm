import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nossas-ofertas',
  templateUrl: './nossas-ofertas.component.html',
  styleUrls: ['./nossas-ofertas.component.scss']
})

export class NossasOfertasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'preco', 'precoDesconto', 'loja', 'descricao', 'editarOferta', ];
  dataSource;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.dataSource = JSON.parse(window.localStorage.getItem("ofertas-game-tracker"));
  }

  irParaCadastroOfertas(elementId) {
    this.router.navigate(['cadastroofertas', elementId])
  }

}
