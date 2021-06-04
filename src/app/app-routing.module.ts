import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndvorListComponent } from './endvor-list/endvor-list.component';
import { MasterLookupComponent } from './master-lookup/master-lookup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MasterLkDtlsComponent } from './master-lk-dtls/master-lk-dtls.component';
import { ObjectListComponent } from './object-list/object-list.component';
import { PackageComponent } from './Package/package.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: '', component: ObjectListComponent},
  {path: 'object-list',component: ObjectListComponent },
  {path: 'endvor-list', component: EndvorListComponent},
  {path: 'master-lookup',  canActivate: [AuthGuard],component: MasterLookupComponent},
  {path: 'master-lk-dtls/:id', component: MasterLkDtlsComponent},
  {path: 'package', component:PackageComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: '**' , component : PageNotFoundComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [EndvorListComponent ,
                                 MasterLookupComponent,
                                 PageNotFoundComponent,
                                 MasterLkDtlsComponent,
                                 ObjectListComponent ,
                                 PackageComponent,
                                 LoginComponent,
                                 RegisterComponent
                                 ]
