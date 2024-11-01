import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';

const routes: Routes = [
  // {path:'', redirectTo:'/home', pathMatch:"full"},
  // {path:'', component: HomeComponent},
  // {path:'about', component: AboutComponent}

  {path:'',
    loadChildren: () => 
      import ('./home/home.module').then((m) => m.HomeModule),
  },
  {path:'about',
    loadChildren: () => 
      import ('./about/about.module').then((m) => m.AboutModule),
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
