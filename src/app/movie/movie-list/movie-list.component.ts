import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RxFor } from '@rx-angular/template/for';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

import { TMDBMovieModel } from '../../shared/model/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'movie-list',
  imports: [MovieCardComponent, FastSvgComponent, RouterLink, RxFor],
  template: `
   <movie-card
        *rxFor="let movie of movies(); trackBy: 'id'; let $index = index"
        [index]="$index"
        [routerLink]="['/movie', movie.id]"
        [loading]="favoritesLoading().has(movie.id)"
        [favorite]="favoriteMovieIds().has(movie.id)"
        (favoriteChange)="favoriteToggled.emit(movie)"
        [movie]="movie"
      />
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 35rem));
      gap: 4rem 2rem;
      place-content: space-between space-evenly;
      align-items: start;
      position: relative;
    }
  `,
})
export class MovieListComponent {
  movies = input.required<TMDBMovieModel[]>();
  favoriteMovieIds = input<Set<string>>(new Set<string>([]));
  favoritesLoading = input(new Set<string>());

  favoriteToggled = output<TMDBMovieModel>();
}
