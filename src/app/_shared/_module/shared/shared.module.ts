import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPickerComponent } from '../../_components/_pickers/location-picker/location-picker.component';
import { IonicModule } from '@ionic/angular'
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [LocationPickerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [LocationPickerComponent],
  entryComponents: [LocationPickerComponent]
})
export class SharedModule { }
