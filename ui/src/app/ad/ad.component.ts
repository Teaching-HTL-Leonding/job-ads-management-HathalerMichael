import { Component, inject, signal } from '@angular/core';
import { ad, AdService } from '../ad.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.css'
})
export class AdComponent {
  private adService = inject(AdService);
  ad_titles = signal<string[]>([]);

  ads : ad[] = [];

  ngOnInit(){
    this.setAds();
  }

  async setAds(){
    this.ads = await this.adService.getAds();
    this.ad_titles.set(this.ads.map(ad => ad.title));
  }

  deleteAd(title : string){
    let foundAd= this.ads.find(ad => ad.title === title);
    console.log(title);
    if (foundAd !== undefined){
      this.adService.deleteAd(foundAd.id);
    }
  }
}
