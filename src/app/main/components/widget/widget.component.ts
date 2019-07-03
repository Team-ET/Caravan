import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/core/components/widget/widget.component.ts
// import { Cloudinary } from 'cloudinary-core';
=======
>>>>>>> 1cf1a1865779f2b4bc1238f7b1a170ba7a585b97:src/app/main/components/widget/widget.component.ts
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
  this.getPhotos();
  }
  myClick() {
    // console.log('DO I CLICK')
    let myWidget = cloudinary.createUploadWidget({
      cloudName: 'sc0ttiee', 
      uploadPreset: 'atiwd1dv'}, async (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
          const photoObject = await this.widgetService.savePhoto(result.info);
        }
      }
    )
    
    document.getElementById("upload_widget").addEventListener("click", function(){
        myWidget.open();
      });//test
    
  }
  getPhotos(): void {
    this.widgetService.getPhotos()
      .subscribe(photos => {
        console.log('getting photos', photos);
        this.photos = photos;
      });
  }
}
