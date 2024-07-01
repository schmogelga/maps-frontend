import { Component, OnInit, OnDestroy } from '@angular/core';
import { tileLayer, latLng, marker, Marker, LeafletMouseEvent, Map, icon } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MapPointModalComponent } from '../map-point-modal/map-point-modal.component';
import { WeatherClient } from '../clients/weather.client';

const defaultIcon = icon({
  iconUrl: 'assets/images/icon.png',
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const analyzeIcon = icon({
  iconUrl: 'assets/images/icon_bw.png', // URL do ícone preto e branco
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  options: any;
  layers: Marker<any>[] = [];
  map: Map | null = null; // Inicialize como null

  constructor(private http: HttpClient, public dialog: MatDialog, private weatherClient: WeatherClient) {}

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' })
      ],
      zoom: 10,
      center: latLng(-30.0346, -51.2177) // Coordenadas para o Rio Grande do Sul
    };

    this.map = new Map('map', this.options);
    this.map.on('click', this.onMapClick.bind(this));

    // Carregar eventos (pontos) ao abrir a tela
    this.loadMapPoints();
  }

  loadMapPoints() {
    // Limpar camadas existentes
    this.layers.forEach(layer => {
      if (this.map) {
        this.map.removeLayer(layer);
      }
    });
    this.layers = [];

    // Carregar eventos ATIVO
    this.weatherClient.getEvents('ATIVO').subscribe(events => {
      console.log('Eventos recebidos:', events); // Verificar se os eventos estão sendo recebidos corretamente
  
      events.forEach(event => {
        console.log('Processando evento:', event); // Verificar cada evento antes de criar o marcador
  
        const newMarker = marker([event.latitude, event.longitude], {
          icon: defaultIcon
        }).bindPopup(`<b>${event.descricao}</b>`);
  
        if (this.map) {
          newMarker.addTo(this.map); // Adicionar o marcador ao mapa apenas se o mapa não for null
        }
        this.layers.push(newMarker); // Adicionar o marcador à lista de camadas
      });
    });

    // Carregar eventos ANALISE
    this.weatherClient.getEvents('ANALISE').subscribe(events => {
      console.log('Eventos recebidos de ANALISE:', events); // Verificar se os eventos estão sendo recebidos corretamente
  
      events.forEach(event => {
        console.log('Processando evento de ANALISE:', event); // Verificar cada evento antes de criar o marcador
  
        const newMarker = marker([event.latitude, event.longitude], {
          icon: analyzeIcon
        }).bindPopup(`<b>${event.descricao}</b>`);
  
        if (this.map) {
          newMarker.addTo(this.map); // Adicionar o marcador ao mapa apenas se o mapa não for null
        }
        this.layers.push(newMarker); // Adicionar o marcador à lista de camadas
      });
    });
  }

  onMapClick(event: LeafletMouseEvent) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    const dialogRef = this.dialog.open(MapPointModalComponent, {
      width: '300px',
      data: { lat, lng }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Save to backend
        this.weatherClient.createEvent(result.description, lat, lng).subscribe((response: any) => {
          console.log('Evento criado com sucesso:', response);
          this.loadMapPoints(); // Recarregar a tela após adicionar um novo ponto
        }, error => {
          console.error('Erro ao criar evento:', error);
        });
      }
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy executed');
    if (this.map) {
      this.map.off();
      this.map.remove();
      this.map = null;
    }
  }
}
