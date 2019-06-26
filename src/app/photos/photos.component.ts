import { Component, NgModule, OnInit } from '@angular/core';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';// test

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
@NgModule({
  imports: [
      CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'your_cloud_name' } as CloudinaryConfiguration),
  ],
  bootstrap: [/* ... */]
})

export class PhotosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
