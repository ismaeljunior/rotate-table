import { Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { SaidaComponent } from './saida/saida.component'

export const ROUTES: Routes = [
    { path: '', component: AppComponent },
    { path: 'saida', component: SaidaComponent },
]
