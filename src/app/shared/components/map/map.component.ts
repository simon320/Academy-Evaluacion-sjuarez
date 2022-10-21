import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  template: `<div #map></div>`,
  styles: [`
    div {
      width: 350px;
      height: 300px;
      border-radius: 5px;
    }
  
  `]
})
export class MapComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0,0];
  @ViewChild('map') divMap!: ElementRef;

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: this.lngLat,
      zoom: 14,
      interactive: false
    })

    new mapboxgl.Marker()
      .setLngLat( this.lngLat )
      .addTo( map )
  }

}
