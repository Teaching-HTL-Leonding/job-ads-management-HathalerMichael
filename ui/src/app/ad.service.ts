import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type ad = {
  "title": "string",
  "textEN": "string",
  "id": 0,
  "translations": [
    {
      "language": "string",
      "translatedText": "string"
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
    return firstValueFrom(this.httpClient.get<ad[]>('http://localhost:3000/ads'));
  }

  deleteAd(id : number){
    firstValueFrom(this.httpClient.delete(`http://localhost:3000/ads/${id}`));
  }


}
