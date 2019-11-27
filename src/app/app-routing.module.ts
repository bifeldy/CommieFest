import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_shared/_guard/auth.guard';
import { SecureInnerPagesGuard } from './_shared/_guard/secure-inner-pages.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then(m => m.VerifyPageModule),
    canActivate: [SecureInnerPagesGuard]
  },





  {
    path: 'details',
    loadChildren: () => import('./home/details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./home/details/details.module').then(m => m.DetailsPageModule)
  },


  {
    path: 'add',
    loadChildren: () => import('./home/add/add.module').then(m => m.AddPageModule)
  },

  {
    path: 'add:/id',
    loadChildren: () => import('./home/add/add.module').then(m => m.AddPageModule)
  },

  {
    path: 'edit',
    loadChildren: () => import('./home/edit/edit.module').then(m => m.EditPageModule)
  },

  {
    path: 'edit:/id',
    loadChildren: () => import('./home/edit/edit.module').then(m => m.EditPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
