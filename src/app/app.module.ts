import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule ,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportModule } from './import/import.module'
import { ObjectsService } from './objects.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EndvorListComponent } from './endvor-list/endvor-list.component';
import { MasterLookupComponent } from './master-lookup/master-lookup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MasterLkDtlsComponent } from './master-lk-dtls/master-lk-dtls.component';
import { ObjectListComponent } from './object-list/object-list.component';
import { MasterLookupService } from './master-lookup.service';
import { IntercepterService } from './intercepter.service';
import { LookupReadComponent } from './lookup-read/lookup-read.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ObjectFormComponent } from './object-form/object-form.component';
import { PackageComponent } from './Package/package.component';
import { PackageService } from './package.service';
import { PackageFormComponent } from './package-form/package-form.component';
import { PackageDataComponent } from './package-data/package-data.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ActionDataComponent } from './action-data/action-data.component';
import { ActionDataService } from './action-data.service';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PageNotFoundComponent,
    MasterLkDtlsComponent,
    ObjectListComponent ,
    MasterLookupComponent ,
    EndvorListComponent,
    LookupReadComponent,
    SpinnerComponent,
    ObjectFormComponent,
    PackageComponent,
    PackageFormComponent,
    PackageDataComponent,
    RegisterComponent,
    LoginComponent,
    ActionDataComponent
    
   
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImportModule ,
    CommonModule 
     
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorService, multi:true},
    ObjectsService,MasterLookupService,PackageService, AuthGuard,AuthService,ActionDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
