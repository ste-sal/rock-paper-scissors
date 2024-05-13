import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'rps-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div
      class="flex flex-col gap-1"
    >
      <h2
        class="text-2xl font-bold font-mono text-neutral-800 mb-10"
      >
        Let&apos;s play
      </h2>
    </div>
    
    <span
      class="flex flex-col gap-2"
    >
      <a
        routerLink="/play"
        class="w-fit py-2 px-6 rounded-md cursor-pointer bg-primary text-white"
      >
        Start a game
      </a>

      <span>
        See your
        <a
          routerLink="/scores"
          class="text-primary text-center font-bold cursor-pointer"
        >
          scores
        </a>
      </span>
    </span>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
