# ChangeDetectionStrategy OnPush Exercises

In this exercise we will focus on basic runtime optimizations in angular applications by using our knowledge about
the `ChangeDetection` system in angular.

As we have seen by introducing the `dirty-check` component: our application is heavily over-checking our components.

The goal of this exercise is to give you a deep understanding of the `ChangeDetection` system in angular. We will learn
how to optimize our applications runtime performance by using `ChangeDetectionStrategy.OnPush`.

## 0. Using `ChangeDetectionStrategy.OnPush` disclaimer

Since Angular 22, components use `ChangeDetectionStrategy.OnPush` by default, but the app's own components (`AppComponent`, `AppShellComponent`, `src/app/movie/*`) are
pinned to `ChangeDetectionStrategy.Eager` (the former `Default`). The design system components in `src/app/ui` already use `OnPush`.
This means a component will be checked (template bindings will be re-evaluated) every time any action happens on the page.
This can cause severe performance issues.

You should aim to use `ChangeDetectionStrategy.OnPush` in all your components.

### 1. MovieCardComponent: OnPush

Let's start by introducing `ChangeDetectionStrategy.OnPush` to a `Leaf` component, as this is the safest way to migrate.
This will also help to get a deeper understanding of rendering cycles in the context of the `ComponentTree`.

* add the `<dirty-check />` component to the `MovieCardComponent`s template (if not done before)
* serve the application & note the initial values
* interact with the app and observe the counter in the `MovieCardComponent`
* apply `ChangeDetectionStrategy.OnPush` to `MovieCardComponent`
* hover over the movie cards again: the counters stop — and the tilt breaks, because the `TiltDirective` writes a
  plain field in a `fromEvent` subscription, which doesn't mark the `OnPush` card dirty. The
  [manual change detection](./change-detection%20-%20manual%20cd.md) and
  [signals](./change-detection%20-%20signals.md) exercises fix that.

<details>
    <summary>MovieCardComponent OnPush</summary>

```html
<!-- src/app/movie/movie-card/movie-card.component.ts (template) -->

<div class="movie-card">
  <dirty-check />
  <!-- other template -->
</div>
```

```ts
// src/app/movie/movie-card/movie-card.component.ts

@Component({
  /* */
  changeDetection: ChangeDetectionStrategy.OnPush, // was: Eager
})
export class MovieCardComponent {}
```

</details>

### 2. AppComponent

Let's do one more simple but significant change and make our `AppComponent` use `ChangeDetectionStrategy.OnPush` changeDetection.

> [!WARNING]
> It is typically **bad practice** to introduce ChangeDetectionStrategy.OnPush on the root component in an early stage
> of this migration.
> It **WILL MOST PROBABLY ;-)** lead to very unknown side effects across your whole application.

<details>
    <summary>Use ChangeDetection OnPush</summary>

```typescript
// src/app/app.component.ts

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <dirty-check />
      <router-outlet />
    </app-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, // was: Eager
  imports: [RouterOutlet, AppShellComponent, DirtyCheckComponent],
})
```

</details>

Serve the application, note how the counter increases way less than before (hovering doesn't increase it anymore).
This is because the Component now only re-renders when being on a dirty-path.

> [!IMPORTANT]
> **REMEMBER** the bug where you have to just _click something_ in the app until your changes are displayed
> on the screen? Well, you've just introduced it 🥳🥳🥳. If you face an empty screen, just click something (e.g. the
> dark mode toggle) - your movies will be rendered afterwards.

> [!NOTE]
> We will fix this issue in the next exercises, so don't worry (see the
> [manual change detection](./change-detection%20-%20manual%20cd.md) and
> [zoneless](./change-detection%20-%20zoneless.md) exercises).

### 3. BONUS: more ChangeDetectionStrategy.OnPush

> [!NOTE]
> This is a bonus exercise, you don't need to complete it.

Try to think about other components that would benefit from the `OnPush` `ChangeDetectionStrategy` and apply it.
Make sure to first use the `<dirty-check />` component in order to measure the improvement.

Feel free to ask questions if anything unexpected happens.

### 4. BONUS: Schematics

> [!NOTE]
> This is a bonus exercise, you don't need to complete it.

Since Angular 22 components generated with `ng generate component` use `OnPush` by default (no `changeDetection` entry is
generated). Generate one (`npx ng g c shared/my-test --type=component`) and check the result, then delete it again.
