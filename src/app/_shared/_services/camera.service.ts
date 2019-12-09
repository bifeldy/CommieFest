import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private camera: Camera
  ) { }

  openCamera(cropWidth = 256, cropHeight = 256) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: cropWidth,
      targetHeight: cropHeight
    };
    return this.camera.getPicture(options);
  }

  openGallery(cropWidth = 256, cropHeight = 256) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: cropWidth,
      targetHeight: cropHeight
    };
    return this.camera.getPicture(options);
  }
}
