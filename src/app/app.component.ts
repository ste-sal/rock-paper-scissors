import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div
      class="w-full sm:w-auto sm:h-auto h-full p-5 rounded-lg drop-shadow bg-neutral-100"
    >
      <h1 class="font-mono text-3xl text-center mb-5">Rock Paper Scissors</h1>
      <router-outlet />
    </div>
  `,
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `
})
export class AppComponent { }
