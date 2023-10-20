import { Component, ViewChild, ElementRef, Input} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from 'src/environments/environment'

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent {

  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  public map?: mapboxgl.Map;


  ngAfterViewInit() {
    if( !this.divMap?.nativeElement ) throw "Map Div not found";
    if( !this.lngLat ) throw "LngLat can't be null";

    //creacion del mapa
    (mapboxgl as any).accessToken = environment.mapbox_key;
        this.map=  new mapboxgl.Map({
        container: this.divMap?.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.lngLat,
        zoom:15,
        interactive:false
   });

    new mapboxgl.Marker()
      .setLngLat( this.lngLat )
      .addTo( this.map )

  }

}
