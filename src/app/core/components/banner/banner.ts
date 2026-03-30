import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  imports: [CommonModule ],
  templateUrl: './banner.html',
})
export class Banner implements OnChanges {

  @Input({required: true}) bannerTitle = '';
  @Input() bannerOverview = '';
  @Input() key = '4ECAaQkNAbc';
  private sanitizer = inject(DomSanitizer)



  // videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/watch?v=${this.key}?autoplay=1&mute=1&loop=1&controls=0`)

  // //   this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
  // // https://www.youtube.com/watch?v=4ECAaQkNAbc

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes['key']){
  //     this.videoUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/watch?v=${this.key}?autoplay=1&mute=1&loop=1&controls=0`)
  //   }
  // }


  // Initial declaration
videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  `https://www.youtube.com/embed/4ECAaQkNAbc?autoplay=1&mute=1&loop=1&controls=0`
);
https: any;

ngOnChanges(changes: SimpleChanges): void {
  if (changes['key']) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/4ECAaQkNAbc?autoplay=1&mute=1&loop=1&controls=0`
    );
  }
}


}
