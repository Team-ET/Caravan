import { Component, OnInit } from '@angular/core';
import { Cloudinary } from 'cloudinary-core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  myClick() {
    // console.log('DO I CLICK')
    let myWidget = cloudinary.createUploadWidget({
      cloudName: 'sc0ttiee', 
      uploadPreset: 'atiwd1dv'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
        }
      }
    )
    
     document.getElementById("upload_widget").addEventListener("click", function(){
        myWidget.open();
      });
  }
}
