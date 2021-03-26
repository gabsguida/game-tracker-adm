import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  ofertaId: number;
  ofertas: any[] = [];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.novaOfertaForm = this.fb.group({
      id: ['', Validators.required],
      titulo: ['', Validators.required],
      preco: ['', Validators.required, Validators.min(1)],
      precoDesconto: ['', Validators.required, Validators.min(1)],
      descricao: [''],
      loja: ['', Validators.required]
    });

    this.obterOfertaPorQueryParams();
  }

  obterOfertaPorQueryParams() {
    this.ofertaId = parseFloat(this.activatedRoute.snapshot.params.id);

    this.ofertas = JSON.parse(window.localStorage.getItem("ofertas-game-tracker"));

    if(this.ofertaId != 0 && this.ofertaId != undefined) {
      let ofertaFiltrada = this.ofertas.filter(oferta => oferta.id === this.ofertaId)[0];
      this.novaOfertaForm.setValue({
        id: ofertaFiltrada.id,
        titulo: ofertaFiltrada.titulo,
        preco: ofertaFiltrada.preco,
        precoDesconto: ofertaFiltrada.precoDesconto,
        descricao: ofertaFiltrada.descricao ?? '',
        loja: ofertaFiltrada.loja ?? ''
      })
    }
  }

  hasError(formGroup: FormGroup, formName: string, message?: string, invalidMessage?: string) {
    let controls = formGroup.get(formName);
    if (controls.errors != null) {
      switch (true) {
        case controls.errors['required'] && (controls.dirty || controls.touched): {
          return message ? message : "Campo obrigatório"
        }
        case (controls.errors['email'] || controls.errors['mask']) && (controls.dirty || controls.touched): {
          return invalidMessage ? invalidMessage : "Campo inválido"
        }
        case (controls.errors['depositAmountInvalid'] && (controls.dirty || controls.touched)):
          return 'Valor do depósito maior do que o valor da fatura'
        default:
          break;
      }
    }
  }

  checkIdUnico() {
    let id = this.novaOfertaForm.get('id').value;
    let ofertasFiltrado = this.ofertas.filter(oferta => oferta.id === id);

    console.log(ofertasFiltrado)

    if(ofertasFiltrado.length > 0) {
      this.novaOfertaForm.get('id').setErrors({ idInvalid: true });

      console.log(this.novaOfertaForm)
    } else {
      this.novaOfertaForm.get('id').setErrors(null);
    }
  }

  checkPrecoDescontoValido() {
    let precoDesconto = this.novaOfertaForm.get('precoDesconto').value;
    let preco = this.novaOfertaForm.get('preco').value;

    if(precoDesconto > preco) {
      this.novaOfertaForm.get('precoDesconto').setErrors({ precoDescontoInvalid: true })
    } else {
      this.novaOfertaForm.get('precoDesconto').setErrors(null)
    }

  }

  salvarOferta() {
    console.log(this.novaOfertaForm.value)
    this.router.navigate(['nossasofertas']);
  }  

}
