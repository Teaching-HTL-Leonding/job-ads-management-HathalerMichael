import { Component, inject, signal } from '@angular/core';
import { ad, AdService } from '../ad.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [FormsModule],
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

  async updateDetail(event : Event, updateTitle : boolean){
    console.log("Update detail");
    console.log(this.id());





    if(updateTitle){
      let newTitle = event.target as HTMLInputElement;
      this.title.set(newTitle.value);
      console.log(newTitle.value);
      let updatedParts : Partial<ad> = {
        title: newTitle.value
      };
      this.adService.updateDetail(parseInt(this.id()), updatedParts);
    }
    else{
      let newText = event.target as HTMLInputElement;

      this.title.set(newText.value);
      let updatedParts : Partial<ad> = {
        textEN: newText.value
      };
      this.adService.updateDetail(parseInt(this.id()), updatedParts);
    }
  }

}
