import { Component , AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from 'src/environments/environment'

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento HTML no fue encontrado';

    (mapboxgl as any).accessToken = environment.mapbox_key;
    const map=  new mapboxgl.Map({
        container: this.divMap?.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center:[-74.5, 40],
        zoom:9,
   })
  }

}
