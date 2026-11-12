# ChangeDetectionStrategy trackBy exercises

In this exercise we will focus on basic runtime optimizations in angular applications by using our knowledge about
the `ChangeDetection` system in angular.

## Goal

The goal of this exercise is to give you a deep understanding of the `ChangeDetection` system in angular. We will learn
how to optimize our applications runtime performance by using the `trackBy function`.

## MovieSearchControlComponent

![MovieSearchControlComponent](images/change-detection/movie-search-control.png)

Apply the `dirty-check` component to the template of the `MovieSearchControlComponent`. Add it inside of the `button`
element created for each search result.

<details>
  <summary>Apply DirtyChecks to MovieSearchControlComponent</summary>

```html
<!-- src/app/movie/movie-search-control/movie-search-control.component.ts (template) -->

@for (movie of movies; track movie) {
  <button class="movie-result" (click)="selectMovie(movie)">
    <dirty-check />

    <img [src]="movie.poster_path | movieImage" width="35" [alt]="movie.title" />
    <span>{{ movie.title }}</span>
  </button>
}
```

</details>

Serve the application, navigate to `/my-movies` and interact with the search-control. In order to force the list to update
already existing elements, try to search for `batman` => `batm` => `batman`...

```bash
ng serve
```
You will see the counter always resetting to 1.

You might think, yeah that's exactly what I've wanted. But, the counter always resetting actually means, the template
always gets destroyed and re-created.

Open the `devtools` and go to the `Elements` tab. Find the result list in the `DOM` and perform a search.
You should see the dom elements getting actually destroyed.

The task is to improve this situation by letting angular know how to identify objects and update the template instead of
re-creating it.

The `@for` block of the `MovieSearchControlComponent` currently uses `track movie`: it identifies items by object
identity, and every search response contains new objects. Change the `track` expression so that it identifies a movie
by its `id`: `track movie.id` (the `track` expression can also call a function, e.g. `track trackMovie($index, movie)`
with a `trackMovie: TrackByFunction<MovieModel>` in the component).

<details>
    <summary>Solution: track by id</summary>

```html
<!-- src/app/movie/movie-search-control/movie-search-control.component.ts (template) -->
@for (movie of movies; track movie.id) {
  <button class="movie-result"
          (click)="selectMovie(movie)">
    <!-- the template -->
  </button>
}
```

</details>

<details>
    <summary>Alternative: track function</summary>

```ts
// src/app/movie/movie-search-control/movie-search-control.component.ts
trackMovie: TrackByFunction<MovieModel> = (i, movie) => movie.id;
```

```html
@for (movie of movies; track trackMovie($index, movie)) {
  <!-- the template -->
}
```

</details>

Serve the application and repeat the interaction with the `MovieSearchControlComponent`. Watch the counter now actually
updating instead of re-instantiating. Also use the `devtools` and inspect the `Elements`. You should now that the Nodes are
getting updated now.

```bash
ng serve
```

## Bonus: MovieSearchPageComponent

Since we have the same kind of issue in our `MovieSearchPageComponent`, lets go there and apply the same fixes as before.

* apply the `dirty-check` component so that you have visual feedback of your improvement
  * you probably need to dig into `MovieListComponent` since this is the place where the iteration happens
* Repeat the interaction process, but perform it on the global movie search (top widget)
* Inspect the counter & `devtools > Elements` tab
* make sure the `@for` identifies the movies by `id` (`track movie.id`)
* repeat the interaction

