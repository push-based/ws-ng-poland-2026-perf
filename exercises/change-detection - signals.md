# ChangeDetection - Signals Exercise

This exercise is here to showcase how powerful signal change detection is. We are not quite at the level
we get with signal components, but we are close to it already.

It builds on the [OnPush exercise](./change-detection%20-%20OnPush.md): `MovieCardComponent` is `OnPush`, and the
`<dirty-check />` counters from the [Dirty Check exercise](./change-detection%20-%20Dirty%20Check.md) are in place.

## TiltDirective signal CD

We are going to slightly adjust the `TiltDirective` in order to make use of the new signal based
change detection.

Open the `TiltDirective` (`src/app/shared/tilt.directive.ts`) and..

**1. Transform `rotate` into a signal**

Refactor the `rotate` field from a static property to a `signal()`. Set the initial value to `rotate(0deg)`
Update all the code that updates the `rotate` field to use the signal `set` or `update` apis.

<details>
  <summary>TiltDirective rotate signal</summary>

```diff
// src/app/shared/tilt.directive.ts

- import { Directive, ElementRef, input } from '@angular/core';
+ import { Directive, ElementRef, input, signal } from '@angular/core';

- rotate = 'rotate(0deg)';
+ rotate = signal('rotate(0deg)');
```

```diff
merge(rotate$, reset$).subscribe((rotate) => {
- this.rotate = rotate;
+ this.rotate.set(rotate);
});
```

</details>

**2. Update host binding to call the signal**

In order for everything to work, we need to call the signal in the host binding.

<details>
  <summary>TiltDirective use signal in {host} decorator style</summary>

```ts
// src/app/shared/tilt.directive.ts

@Directive({
  selector: '[tilt]',
  host: {
    '[style.transform]': 'rotate()', // <-- update this line
  },
})
export class TiltDirective {
  //...
}


```

</details>

**3. Remove markForCheck call**

Because we are using signals, we don't need to call `markForCheck` anymore. Change detection should just work.
(Only if you added it in the [manual change detection exercise](./change-detection%20-%20manual%20cd.md) — otherwise
there is nothing to remove.)


<details>
  <summary>TiltDirective remove markForCheck</summary>

```diff
// src/app/shared/tilt.directive.ts

@Directive(...)
export class TiltDirective {
  constructor(private elementRef: ElementRef<HTMLElement>) {
    // ...
    merge(rotate$, reset$).subscribe((rotate) => {
      this.rotate.set(rotate);
-     this.cdRef.markForCheck(); // <-- remove this line
    });
  }
}
```

</details>


Great! Please take a look at your application and be amazed by the change detection counters.
🔥🔥🔥🔥


<details>
  <summary>Signals ChangeDetection result</summary>

#### Explanation:
- The TiltDirective uses a signal to update the `rotate` value
- The hovered `MovieCardComponent` is refreshed (the counter increases) because a signal was updated, its `OnPush`
  siblings are skipped (Local Change Detection)
- The parents are still checked as long as they are `Eager` (zone.js ticks the whole tree on every event). Only the
  components you switched to `OnPush` (e.g. `AppComponent`) stop counting. That changes for everything when we go
  [zoneless](./change-detection%20-%20zoneless.md).
- 🎉 This means we can refresh child components without refreshing any parent component (Local Change Detection)!

![signals-cd.gif](images/change-detection/signals-cd.gif)

</details>


## Check out Matthieu Riegler's Demo !!!

https://jeanmeche.github.io/angular-change-detection/
