
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from 'src/app/interfaces/registro.interface';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private _auth: Registro | undefined;
  get auth(): Registro {
    return { ...this._auth! }
  }
  private baseUrl = "https://localhost:44368/";
  private apiUrl = "api/Registro/";
  private loginUrl = "/api/Registro/Login/?"
  constructor(private http: HttpClient) { }
  setRegistro(registro: Registro): Observable<any> {
    return this.http.post(this.baseUrl + this.apiUrl, registro);
  }
  verificaAutenticacion(): Observable<boolean> {

    if (!localStorage.getItem('correo')) {
      return of(false);
    }
    return this.http.get<Registro>(`${this.baseUrl + this.loginUrl}`)
      .pipe(
        map(auth => {
          this._auth = auth;
          return true;
        })
      );
  }
  login(correo: string, password: string) {

    return this.http.get<Registro>(`${this.baseUrl + this.loginUrl}correo=` + correo + `&password=` + password)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('correo', auth.correo)),
      );
    console.log(this.auth);
  }

}


