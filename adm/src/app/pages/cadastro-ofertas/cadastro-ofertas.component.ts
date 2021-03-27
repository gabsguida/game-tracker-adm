import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  initialValue: number = 1;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.novaOfertaForm = this.fb.group({
      id: ['', Validators.required],
      titulo: ['', Validators.required],
      preco: ['', Validators.required],
      precoDesconto: ['', Validators.required],
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

  parseFloatPrecos(preco: string): number {
    return parseFloat(preco.replace(',', '.'));
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
        case (controls.errors['idInvalid'] && (controls.dirty || controls.touched)):
          return 'Id existente, por favor, insira outro id!'

        case (controls.errors['precoDescontoInvalid'] && (controls.dirty || controls.touched)):
          return 'Desconto deve ser menor que o preço original'
        
        case (controls.errors['precoInvalid'] && (controls.dirty || controls.touched)):
          return 'Preço deve ser maior do que zero'
        default:
          break;
      }
    }
  }

  checkIdUnico() {
    let id = this.novaOfertaForm.get('id').value;
    let ofertasFiltrado = this.ofertas.filter(oferta => oferta.id === id);

    if(ofertasFiltrado.length > 0) {
      this.novaOfertaForm.get('id').setErrors({ idInvalid: true });
    } else {
      this.novaOfertaForm.get('id').setErrors(null);
    }
  }

  checkPrecoValido() {
    let precoDesconto = this.parseFloatPrecos(this.novaOfertaForm.get('precoDesconto').value);
    let preco = this.parseFloatPrecos(this.novaOfertaForm.get('preco').value);

    if(precoDesconto > preco) {
      this.novaOfertaForm.get('precoDesconto').setErrors({ precoDescontoInvalid: true });
    } else {
      this.novaOfertaForm.get('precoDesconto').setErrors(null);
      if(Number.isNaN(precoDesconto) || Number.isNaN(preco)) { 
        this.novaOfertaForm.get('precoDesconto').setValue('');
      }
    }
  }
  
  salvarOferta() {
    if(this.ofertaId != 0 && this.ofertaId != undefined) {
      this.ofertas = this.ofertas && this.ofertas.map(oferta => oferta.id === this.novaOfertaForm.get('id').value ? this.novaOfertaForm.value : oferta);
    } else {
      this.ofertas.push(this.novaOfertaForm.value);
    }
  
    window.localStorage.setItem("ofertas-game-tracker", JSON.stringify(this.ofertas));

    this._snackBar.open('Operação realizada com sucesso!', 'Fechar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });

    this.router.navigate(['nossasofertas']); 
  }  

}
