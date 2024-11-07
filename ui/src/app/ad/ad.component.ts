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
  ads = signal<ad[]>([]);

  ngOnInit(){
    this.setAds();
  }

  async setAds(){
    this.ads.set(await this.adService.getAds());
  }

  async deleteAd(id : number){
    await this.adService.deleteAd(id);
    this.setAds();
  }

  }
