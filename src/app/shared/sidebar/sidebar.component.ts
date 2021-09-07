import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { BusquedaComponent } from 'src/app/gifs/busqueda/busqueda.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  constructor(private gifsService:GifsService) {

   }

   buscar(event:string){
     this.gifsService.buscarGifs(event);
   }
   

   get historial(){
     return this.gifsService.historial;
   }

  ngOnInit(): void {
  }

}
