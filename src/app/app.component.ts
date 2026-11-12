import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppShellComponent } from './app-shell/app-shell.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppShellComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <app-shell>
      <router-outlet />
    </app-shell>
  `,
})
export class AppComponent {}
