import { Component, OnInit } from '@angular/core';
import { Cloudinary } from 'cloudinary-core';
import { WidgetService } from './widget.service';
import { Photos } from 'src/app/models/photos';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
photos: Photos[];
  
constructor(public widgetService: WidgetService) { }

  ngOnInit() {
    // this.getPhotos();
  }
  myClick() {
    let myWidget = Cloudinary.createUploadWidget({
      cloudName: 'sc0ttiee',
      uploadPreset: 'atiwd1dv'}, async (error, result) => { 
        if (!error && result && result.event === 'success') { 
          console.log('Done! Here is the image info: ', result.info); 
          const photoObject = await this.widgetService.savePhoto(result.info);
        }
      }
    );
    
    document.getElementById("upload_widget").addEventListener("click", function(){
        myWidget.open();
    });
    
  }

  getPhotos(): void {
    this.widgetService.getPhotos()
      .subscribe(photos => {
        console.log('getting photos', photos);
        this.photos = photos;
      });
  }
}
