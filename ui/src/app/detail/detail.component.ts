import { Component, inject, signal } from '@angular/core';
import { ad, AdService } from '../ad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private adService = inject(AdService);
  private route = inject(ActivatedRoute)
  ads : ad[] = [];
  title = signal('');
  id = signal('');
  textEN = signal('');


  ngOnInit(){
    this.getSingleAdDetail();
  }

  async getSingleAdDetail(){
    let adTitle = this.route.snapshot.paramMap.get('ad');
    this.ads = await this.adService.getAds();
    let foundAd = this.ads.find(ad => ad.title === adTitle);
    if (foundAd !== undefined){
      this.title.set(foundAd.title);
      this.id.set(foundAd.id.toString());
      this.textEN.set(foundAd.textEN);

    }



  }

}
