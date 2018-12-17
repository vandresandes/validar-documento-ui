import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private title: string = 'Validação de Documento';
  private logo: string = "assets/img/logo.png";

  constructor() { }

  ngOnInit() {
  }

}
