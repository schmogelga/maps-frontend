import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, Marker, LeafletMouseEvent, Map, icon } from 'leaflet';
import { HttpClient } from '@angular/common/http';

const defaultIcon = icon({
  iconUrl: 'path/to/default/icon.png', // Substitua pelo caminho do seu ícone
  iconSize: [25, 41], // Tamanho do ícone em pixels
  iconAnchor: [12, 41], // Ponto de ancoragem do ícone
  popupAnchor: [1, -34] // Ponto de ancoragem do popup
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  options: any;
  layers: Marker<any>[] = [];
  map!: Map; // Adicionamos a inicialização '!' para indicar que essa propriedade será inicializada no construtor

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' })
      ],
      zoom: 10,
      center: latLng(-23.55052, -46.633308) // Posição inicial, pode ajustar conforme necessário
    };
  
    // Inicializar o mapa
    this.map = new Map('map', this.options);
  
    // Adicionar ouvinte de eventos de clique ao mapa
    this.map.on('click', this.onMapClick.bind(this));
  
    // Carregar pontos do mapa
    //this.loadMapPoints();
  }

  loadMapPoints() {
    this.http.get<any[]>('http://seu-backend-url/api/mappoints').subscribe(points => {
      this.layers = points.map(point => marker([point.latitude, point.longitude]).bindPopup(point.info));
    });
  }

  onMapClick(event: LeafletMouseEvent) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
  
    // Criar um marcador no local do clique
    const newMarker = marker([lat, lng], {
      icon: defaultIcon // Use o ícone padrão do Leaflet
    }).addTo(this.map);  
    // Adicionar um popup ao marcador
    newMarker.bindPopup("Waypoint criado!");
  
    // Adicionar o novo marcador à lista de camadas
    this.layers.push(newMarker);
  }
}
