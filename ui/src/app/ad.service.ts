import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type ad = {
  "title": string,
  "textEN": string,
  "id": 0,
  "translations": [
    {
      "language": string,
      "translatedText": string
    }
  ]
}

@Injectable({
  providedIn: 'root'
})

export class AdService {
  constructor() { }
  private httpClient = inject(HttpClient);

  async getAds() : Promise<ad[]> {
    console.log("set ads");
    return firstValueFrom(this.httpClient.get<ad[]>('http://localhost:3000/ads'));
  }

  async deleteAd(id : number){
    console.log("delete ad");

    firstValueFrom(this.httpClient.delete(`http://localhost:3000/ads/${id}`));
  }

  async getSingleAd(id : number) : Promise<ad>{
    return firstValueFrom(this.httpClient.get<ad>(`http://localhost:3000/ads/${id}`));
  }

  async updateDetail(id : number, updatedParts : Partial<ad>  ){
    console.log(updatedParts);

    console.log(updatedParts);

    firstValueFrom(this.httpClient.patch(`http://localhost:3000/ads/${id}`, updatedParts));
  }


}
