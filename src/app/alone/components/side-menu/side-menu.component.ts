import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem{
  name: string,
  route: string,
}

@Component({
  standalone:true,
  imports:[CommonModule, RouterModule],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems: MenuItem[]=[
    {route: '/maps/fullscreen', name:'FullScreen'},
    {route: '/maps/properties', name:'Houses'},
    {route: '/maps/markers', name:'Markers'},
    {route: '/maps/zoomrange', name:'ZoomRange'},
    {route: '/alone', name:'AlonePage'},
  ]

}
