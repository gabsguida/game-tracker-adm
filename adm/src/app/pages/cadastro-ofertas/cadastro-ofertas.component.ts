import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-ofertas',
  templateUrl: './cadastro-ofertas.component.html',
  styleUrls: ['./cadastro-ofertas.component.scss']
})
export class CadastroOfertasComponent implements OnInit {

  novaOfertaForm: FormGroup;

  lojas = [
    { id: 1, nome: 'Epic' },
    { id: 2, nome: 'Origin' },
    { id: 3, nome: 'Steam' },
  ];

  ofertaId: string;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.novaOfertaForm = this.fb.group({
      id: [''],
      titulo: [''],
      preco: [''],
      precoDesconto: ['']
    });

    this.obterOfertaPorQueryParams();
  }

  obterOfertaPorQueryParams() {
    this.ofertaId = this.activatedRoute.snapshot.params.id;

    let ofertas = JSON.parse(window.localStorage.getItem("ofertas-game-tracker"));

    if(ofertas.length > 0) {

      let ofertaFiltrada = ofertas.filter(oferta => oferta.id === this.ofertaId);
    }

    console.log(ofertas)
  }

  

}
