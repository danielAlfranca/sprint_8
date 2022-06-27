import { animate, query, style, transition, trigger } from '@angular/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginService } from './services/login.service';

const routes: Routes = [
  { path: '', redirectTo: '/welcome?init=true', pathMatch: 'full'},
  { path: '', component: HeaderComponent, outlet:'header' },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'starships', component: HomeComponent ,canActivate:[LoginService]},
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routerAnimation =
  trigger('routerAnimation',[
    transition('* => *', [
      query(':leave', [
        style({ 
          position: 'absolute',
          top: '0',
          left: '0',

        })], { optional: true }),
      query(':enter', [
          style({ 
            position: 'absolute',
            top: '0',
            right: '-100%',
  
          })], { optional: true }),
      query(
        ':leave',
       
        [style(
          { 
            position: 'absolute',
            top: '0',
            left: '0'
          }
        ), animate('0.5s', style({ 

          position: 'absolute',
          top: '0',
          left: '-100%'
        }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({ 
          position: 'absolute',
          top: '0',
          right: '-100%'
        }), animate('0.5s', style({ 

          position: 'absolute',
          top: '0',
          right: '0'

         }))],
        { optional: true }
      )
    ])
  ]);

  