import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage,
        children: [
          {
            path: 'joined-events',
            children: [
              {
                path: '',
                loadChildren: () => import('./joined-events/joined-events.module').then(m => m.JoinedEventsPageModule)
              }
            ]
          },
          {
            path: 'my-events',
            children: [
              {
                path: '',
                loadChildren: () => import('./my-events/my-events.module').then(m => m.MyEventsPageModule)
              }
            ]
          },
          {
            path: '',
            redirectTo: 'joined-events'
          }
        ]
      }
    ])
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
