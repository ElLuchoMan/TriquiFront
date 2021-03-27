import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  cuadros: string[] = [];
  xSigue: boolean = false;
  ganador: string = '';
  constructor(private router: Router) { }
  ngOnInit() {
    this.nuevoJuego();
  }
  nuevoJuego() {
    this.cuadros = Array(9).fill(null);
    this.ganador = '';
    this.xSigue = true;
  }

  get jugador() {
    return this.xSigue ? 'X' : 'O';
  }

  marcar(idx: number) {
    if (!this.cuadros[idx]) {
      this.cuadros.splice(idx, 1, this.jugador);
      this.xSigue = !this.xSigue;
    }
    this.ganador = this.calcularGanador();
  }

  calcularGanador() {
    const lineas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lineas.length; i++) {
      const [a, b, c] = lineas[i];
      if (
        this.cuadros[a] &&
        this.cuadros[a] === this.cuadros[b] &&
        this.cuadros[a] === this.cuadros[c]
      ) {
        return this.cuadros[a];
      }
    }
    return '';
  }
  cerrarCesion() {
    this.router.navigate(['./login'])
  }
}
