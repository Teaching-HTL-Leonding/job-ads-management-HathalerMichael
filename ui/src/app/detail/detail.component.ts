import { Component, inject, signal } from '@angular/core';
import { ad, AdService } from '../ad.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private adService = inject(AdService);
  private route = inject(ActivatedRoute)
  ad = signal<ad>({title: "", textEN: "", id: 0, translations: [{language: "", translatedText: ""}]});
  adId = this.route.snapshot.paramMap.get('ad');

  ngOnInit(){
    this.getSingleAdDetail();
  }

  async getSingleAdDetail(){
    if (this.adId !== null){
      this.ad.set(await this.adService.getSingleAd(parseInt(this.adId)));}
  }

  async updateDetail(){
    console.log("Update detail");

    if (this.adId !== null){
      let updatedParts : Partial<ad> = {
        title: this.ad().title,
        textEN : this.ad().textEN
      }
      this.adService.updateDetail(parseInt(this.adId), updatedParts );
    }
  }

}
