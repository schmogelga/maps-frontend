import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() cardList: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  aprovar(card: any): void {
    console.log('Evento aprovado:', card);
    // Implemente a lógica de backend aqui se necessário
  }

  resolver(card: any): void {
    console.log('Evento resolvido:', card);
    // Implemente a lógica de backend aqui se necessário
  }
}
