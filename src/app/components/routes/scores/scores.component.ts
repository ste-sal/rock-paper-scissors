import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rps-scores',
  standalone: true,
  imports: [],
  template: `
    <h2 class="text-2xl">All your scores</h2>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoresComponent {

}
