import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroOfertasComponent } from './pages/cadastro-ofertas/cadastro-ofertas.component';
import { NossasOfertasComponent } from './pages/nossas-ofertas/nossas-ofertas.component';

const routes: Routes = [
  { path: '', redirectTo: 'nossasofertas', pathMatch: 'full'},
  { path: 'nossasofertas', component:  NossasOfertasComponent },
  { path: 'cadastroofertas/:id', component: CadastroOfertasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
