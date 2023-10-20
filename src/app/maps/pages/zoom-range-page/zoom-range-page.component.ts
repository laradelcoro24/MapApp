import { Component , AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from 'src/environments/environment'
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map') divMap?: ElementRef;

  public zoom= 10;
  public map?: mapboxgl.Map;
  public lnLat: mapboxgl.LngLat = new mapboxgl.LngLat(-74.5,40)

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento HTML no fue encontrado';

    (mapboxgl as any).accessToken = environment.mapbox_key;
        this.map=  new mapboxgl.Map({
        container: this.divMap?.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.lnLat,
        zoom:this.zoom,
   })
   this.mapListeners();
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){
    if(!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev)=>{
    this.zoom= this.map!.getZoom();
    })

    this.map.on('zoomend', (ev)=>{

    if(this.map!.getZoom()<18) return;

    this.map!.zoomTo(18);
    })

    this.map.on('move', ()=> {
      this.lnLat= this.map!.getCenter();

    })

  }
  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }
  zoomChanged( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }

}
