import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TableroComponent } from './pages/triqui/tablero/tablero.component';
import { CuadroComponent } from './pages/triqui/cuadro/cuadro.component';
import { NbLayoutModule, NbMenuModule, NbThemeModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    TableroComponent,
    CuadroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbThemeModule.forRoot(),
    NbMenuModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
