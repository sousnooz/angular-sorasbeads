import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  looks = [
    { image: 'assets/images/4.jpg', caption: '— Commissioned!: Not Open for Remake', showCaption: false },
    { image: 'assets/images/7.jpg', caption: '— Commissioned!: Not Open for Remake', showCaption: false },
    { image: 'assets/images/1.jpg', caption: '— Commissioned!: Open for Remake', showCaption: false },
    { image: 'assets/images/8.jpg', caption: '— Commissioned!: Not Open for Remake', showCaption: false },
    { image: 'assets/images/home.png', caption: '', showCaption: false },
    { image: 'assets/images/3.jpg', caption: '— Commissioned!: Open for Remake', showCaption: false },
    { image: 'assets/images/5.jpg', caption: '— Commissioned!: Not Open for Remake', showCaption: false },
    { image: 'assets/images/2.jpg', caption: '— Commissioned!: Open for Remake', showCaption: false },
    { image: 'assets/images/6.jpg', caption: '— Commissioned!: Open for Remake', showCaption: false },
    { image: 'assets/images/home.png', caption: '', showCaption: false },  ];

  toggleCaption(look: any) {
    look.showCaption = !look.showCaption;
  }
}
