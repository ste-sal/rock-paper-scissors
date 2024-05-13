import { Routes } from '@angular/router';
import { HomeComponent } from './components/routes/home/home.component';
import { PlayComponent } from './components/routes/play/play.component';
import { ScoresComponent } from './components/routes/scores/scores.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'play',
    component: PlayComponent,
  },
  {
    path: 'scores',
    component: ScoresComponent
  }
];
