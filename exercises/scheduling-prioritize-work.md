# Scheduling Exercise: Prioritize Work

In the last exercise you split up the rendering of the movie list with `rxFor`. Now we go one step further:
we don't only split up the work, we also decide which work runs first.

This exercise builds on the last one: the `MovieListComponent` has to use `rxFor` (default strategy).

<details>
  <summary>Show Help</summary>

```html
<!-- src/app/movie/movie-list/movie-list.component.ts (template) -->

<movie-card
  *rxFor="let movie of movies(); trackBy: 'id'; let $index = index"
  [index]="$index"
  [routerLink]="['/movie', movie.id]"
  [loading]="favoritesLoading().has(movie.id)"
  [favorite]="favoriteMovieIds().has(movie.id)"
  (favoriteChange)="favoriteToggled.emit(movie)"
  [movie]="movie"
/>
```

</details>

Serve the movies app and open your browser on the served `host:port`.

```bash
npm start
```

When the app starts, two requests compete for the main thread: the genres for the sidebar and the movies for
the content. Both responses arrive at almost the same time. The genres arrive first, and they are expensive to
render: every genre link renders a `WorkComponent` (`src/app/shared/work.component.ts`) that blocks the main
thread for a while, just like the `work` of the movie cards.

Which of the two does the user care about? The movies.

## 1. Analyse the current state

Open the `Performance Tab` of the devtools, select `6x slowdown` in the `CPU` throttling dropdown and make sure
the `Screenshots` checkbox is checked.

Hit `Start profiling and reload page` (`Ctrl + Shift + E`).

In the `Main` track, look for the task right after the genres request (`genre/movie/list`) arrives. You should
find a `long task` where `AppShellComponent_Template` creates all genre links at once, with a `WorkComponent`
inside of each of them. The movie cards can only start rendering after this task is done.

> [!NOTE]
> Ignore the long tasks at the very start of the recording, that's the bootstrap of the app.

Hover over the screenshots and write down when the first movie cards show up.

## 2. Chunk the sidebar

You already know how to fix the `long task`: render the genre links with `rxFor` instead of `@for`.

Replace the `@for` and the `async` pipe of the genre links in the template of the `AppShellComponent`
(`src/app/app-shell/app-shell.component.html`). `rxFor` takes the `genres$` observable directly. Import `RxFor`
from `@rx-angular/template/for` in the `imports` of the `AppShellComponent`.

<details>
  <summary>Show Help</summary>

```html
<!-- src/app/app-shell/app-shell.component.html -->

<a
  *rxFor="let genre of genres$; trackBy: 'id'"
  class="navigation--link"
  (click)="trackNavigation('list/genre-' + genre.id)"
  [routerLink]="['/list', 'genre', genre.id]"
  routerLinkActive="active"
>
  <div class="navigation--menu-item">
    <fast-svg class="navigation--menu-item-icon" name="genre" width="24" height="24" />
    {{ genre.name }}
    <app-work />
  </div>
</a>
```

</details>

Repeat the recording. The `long task` is gone: the genre links render in small chunks.

But when do the first movie cards show up now? Probably even later than before!

Take a look at the `Main` track: first come the chunks of the genre links, then the chunks of the movie cards.
Both `rxFor` directives use the same scheduler, and with the same priority the work runs in order of arrival.
The genres arrived first, so the movies have to wait until all genre links are done.

## 3. Prioritize the content

Priorities are expressed with `RenderStrategies`. Each strategy has a priority and a render deadline:

| Strategy | Priority | Deadline |
|---|---|---|
| `immediate` | 1 | `0ms` |
| `userBlocking` | 2 | `250ms` |
| `normal` (default) | 3 | `5000ms` |
| `low` | 4 | `10000ms` |
| `idle` | 5 | no deadline |

Give the genre links a lower priority than the movie list, so the movies get rendered first.

<details>
  <summary>Show Help</summary>

```html
<!-- src/app/app-shell/app-shell.component.html -->

<a
  *rxFor="let genre of genres$; trackBy: 'id'; strategy: 'low'"
  ...
>
```

</details>

Repeat the recording. The movie cards come first now, and the genre links fill in afterwards. Compare the time of
the first movie cards with your first recording: it should be way earlier, and there is still no `long task`.

Well done! You told the browser what's important for the user :-)

## 4. Bonus

* Try `idle` instead of `low` for the genre links. Do you see a difference?
* Leave the genre links at `normal` and set the movie list to `userBlocking` instead. Does that work as well?
* Set the genre links to `immediate`. What happens to the `long task`?

<details>
  <summary>Solution</summary>

* `idle` gives the same result as `low` here: nothing else is waiting, so the genre links render right after the movies.
* Yes: what counts is the order of the priorities. Raising the movie list works as well as lowering the sidebar.
* `immediate` has a deadline of `0ms`, so all genre links render in one task: the `long task` is back, and the movies
  have to wait again.

</details>
