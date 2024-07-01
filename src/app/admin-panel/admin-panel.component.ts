import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherClient } from '../clients/weather.client';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  cards: any[] = [];

  constructor(private router: Router, private weatherClient: WeatherClient) { }

  ngOnInit(): void {
    this.loadCardsData();
  }

  loadCardsData() {
    const status1 = 'ATIVO';
    const status2 = 'ANALISE';

    forkJoin([
      this.weatherClient.getEvents(status1),
      this.weatherClient.getEvents(status2)
    ]).subscribe(([events1, events2]) => {
      console.log('Eventos recebidos de ATIVO:', events1);
      console.log('Eventos recebidos de ANALISE:', events2);

      this.cards = [...events1, ...events2].sort((a, b) => new Date(b.registro).getTime() - new Date(a.registro).getTime());
    });
  }

  aprovar(card: any): void {
    console.log('Evento aprovado:', card);
    this.weatherClient.aprovarEvento(card.id).subscribe(response => {
      console.log('Evento aprovado com sucesso:', response);
      this.loadCardsData();
    }, error => {
      console.error('Erro ao aprovar evento:', error);
    });
  }

  resolver(card: any): void {
    console.log('Evento resolvido:', card);
    this.weatherClient.resolverEvento(card.id).subscribe(response => {
      console.log('Evento resolvido com sucesso:', response);
      this.loadCardsData();
    }, error => {
      console.error('Erro ao resolver evento:', error);
    });
  }
  
}
