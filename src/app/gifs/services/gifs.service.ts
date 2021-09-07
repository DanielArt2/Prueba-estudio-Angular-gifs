import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif, Images } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[]= []
  private apiKey: string = 'VpMeRzMe64l95xibw2yLvvG3o79eKMCb';
  private servicioUrl :string = 'https://api.giphy.com/v1/gifs';
  public resultados: Gif[] = []

  constructor(private http:HttpClient) { 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('gif')!) || [];
    /*if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }*/
  }



  get historial(){
    return [...this._historial];
  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this.historial));
    }

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','20')
      .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) =>{
        this.resultados = resp.data;
        localStorage.setItem('gif',JSON.stringify(this.resultados));
        
      })
    
  }
}
