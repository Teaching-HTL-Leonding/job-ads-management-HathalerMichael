import { Component, inject, signal } from '@angular/core';
import { ad, AdService } from '../ad.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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

  translations = signal('');
  translationText = signal('');
  newLanguage = signal('');

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

  async addTranslation() {
    if (this.adId !== null){
      console.log(this.newLanguage());

      this.adService.upsertTranslation(parseInt(this.adId), this.newLanguage(), this.translations());
    }
  }

  async loadTranslation(){

    this.ad().translations.forEach(translation => {
      if (translation.language === this.newLanguage())
      {
        this.ad.set({
          title : this.ad().title,
          textEN : translation.translatedText,
          id : this.ad().id,
          translations : this.ad().translations
        });
      }
    })



  }

}
