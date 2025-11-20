import { Routes } from '@angular/router';
import {Inicio } from './inicio/inicio';
import {Catalogo } from './catalogo/catalogo';
import {Comentarios } from './comentarios/comentarios';
import {Login } from './login/login';
import {Registro } from './registro/registro';
export const routes: Routes = [
{ path: 'inicio', component: Inicio },
{ path: 'catalogo', component: Catalogo },
{ path: 'comentario', component: Comentarios },
{ path: 'login', component: Login },
{ path: 'registro', component: Registro },
];


