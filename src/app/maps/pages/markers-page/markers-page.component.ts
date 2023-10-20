import { Component , AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from 'src/environments/environment'

interface MarkerAndColor{
  color: string,
  marker: mapboxgl.Marker
}
interface PlainMarker {
  color: string,
  lngLat: number[]
}
@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markes-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[]= [];

  public zoom= 10;
  public map?: mapboxgl.Map;
  public lnLat: mapboxgl.LngLat = new mapboxgl.LngLat(-61.57658255798677, -32.484410960451534)

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento HTML no fue encontrado';

    (mapboxgl as any).accessToken = environment.mapbox_key;
        this.map=  new mapboxgl.Map({
        container: this.divMap?.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.lnLat,
        zoom:13,
   });

   this.readFromLocalStorage();

  //  const marketHtlm= document.createElement('div');
  //  marketHtlm.innerHTML = 'Lara'
  //  const market = new mapboxgl.Marker({
  //    color: 'red'
  //   element: marketHtlm
  //  })
  //  .setLngLat(this.lnLat)
  //  .addTo(this.map);

  }
  createMarker(){
    if(!this.map) return;


    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat= this.map.getCenter();


    this.addMarker(lngLat,color);
  }

  addMarker(lngLat:mapboxgl.LngLat, color:string){
    if(!this.map) return;

    const marker = new mapboxgl.Marker({
      color:color,
      draggable:true
    })
    .setLngLat(lngLat)
    .addTo(this.map)

    this.markers.push({color,marker })
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage() );

  }

  deleteMarker(index:number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyToo(marker: mapboxgl.Marker){

    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[]= this.markers.map(({color, marker})=>{

      return{
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
   localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))

  }
  readFromLocalStorage(){

    const plainMarkersString= localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[]= JSON.parse( plainMarkersString);

    plainMarkers.forEach(  ({ color, lngLat}) => {

      const [lng, lat]= lngLat;
      const coords= new mapboxgl.LngLat( lng, lat);



      this.addMarker(coords, color );


    })

  }

}
