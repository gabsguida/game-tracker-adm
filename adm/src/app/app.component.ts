import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adm-game-tracker';

  listaOfertas = [
    { id: 1, titulo: 'Rage 2', preco: '199,00', precoDesconto: '0,00', loja: null, descricao: null },
    { id: 2, titulo: 'Batman: Arkham Knight', preco: '49,99', precoDesconto: '12,49', loja: null, descricao: null },
    { id: 3, titulo: 'Arma 3', preco: '69,99', precoDesconto: '17,49', loja: null, descricao: null },
    { id: 4, titulo: 'Jurassic World Evolution', preco: '79,99', precoDesconto: '19,99', loja: null, descricao: null },
    { id: 5, titulo: 'The Sims 4', preco: '159,00', precoDesconto: '39,75', loja: null, descricao: null },
    { id: 6, titulo: 'Battlefield V', preco: '299,00', precoDesconto: '119,60', loja: null, descricao: null },
  ];

  constructor() {
    let ofertas = window.localStorage.getItem("ofertas-game-tracker");

    if (ofertas == null) {
      window.localStorage.setItem("ofertas-game-tracker", JSON.stringify(this.listaOfertas));
    }
  }
}
