import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SkeletonHomeComponent } from './skeleton-home.component';

@NgModule({
  declarations: [SkeletonHomeComponent],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports: [SkeletonHomeComponent]
})
export class SkeletonHomeModule { }
