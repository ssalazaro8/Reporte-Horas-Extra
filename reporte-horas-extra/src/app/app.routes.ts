import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { GenerarComponent } from './components/generar/generar.component';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RevisionComponent } from './components/revision/revision.component';
import { NavbarRegistrosComponent } from './components/navbar-registros/navbar-registros.component';
import { InicioRegistroComponent } from './components/inicio-registro/inicio-registro.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [RoleGuard],
    data: { roles: [2, 4] }
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
    canActivate: [RoleGuard],
    data: { roles: [2, 4] }
  },
  {
    path: 'generar',
    component: GenerarComponent,
    canActivate: [RoleGuard],
    data: { roles: [3, 4] }
  },
  {
    path: 'consultar',
    component: ConsultarComponent,
    canActivate: [RoleGuard],
    data: { roles: [4, 5] }
  },
  {
    path: 'revision',
    component: RevisionComponent,
    canActivate: [RoleGuard],
    data: { roles: [2, 4] }
  },
  {
    path: 'inicio-registro',
    component: InicioRegistroComponent,
    canActivate: [RoleGuard],
    data: { roles: [1, 2, 3, 4, 5] }
  },
  {
    path: 'app',
    component: NavbarRegistrosComponent,
    children: [
      { path: 'inicio-registro', component: InicioRegistroComponent, canActivate: [RoleGuard], data: { roles: [1, 2, 3, 4] } },
      { path: 'registro', component: RegistroComponent, canActivate: [RoleGuard], data: { roles: [2, 4] } },
      { path: 'revision', component: RevisionComponent, canActivate: [RoleGuard], data: { roles: [2, 4] } },
      { path: 'empleados', component: EmpleadosComponent, canActivate: [RoleGuard], data: { roles: [2, 4] } },
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
