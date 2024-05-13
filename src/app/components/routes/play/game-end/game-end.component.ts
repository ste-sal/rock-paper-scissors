import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameResults } from '../../../../shared/types';

@Component({
  selector: 'rps-game-end',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h5
      class="text-lg font-semibold mb-2"
    >
      {{ resultText() }}
    </h5>

    <span class="flex flex-col gap-2 mb-8">
      <p>
        Out of {{ results().limit }} {{ results().limit === 1 ? 'round' : 'rounds' }} these were the scores:
      </p>

      <span class="flex flex-col gap-1">
        @for (player of players(); track $index) {
          <span
            class="flex gap-1"
          >
            <span class="font-semibold">
              {{ player.name }}
            </span>
            &colon;
            <span class="font-medium">
              {{ player.score }}
            </span>
          </span>
        }
      </span>
    </span>

    <span class="flex flex-col gap-2">
      <button
        class="py-2 px-3 rounded-md cursor-pointer bg-primary text-white"
        (click)="playAgain()"
      >
        Play again?
      </button>
      <span class="flex gap-1">
        See your
        <a
          routerLink="/scores"
          class="text-primary"
        >
          scores history
        </a>
      </span>
    </span>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameEndComponent {
  results = input.required<GameResults>();

  @Output()
  restartGame = new EventEmitter();

  resultText = computed(() => {
    const gameResults = this.results();
    if (!gameResults.winner) return 'The game was a draw!';
    return `${gameResults[gameResults.winner].name} has won the game!`;
  });

  players = computed(() => {
    const { player1, player2 } = this.results();
    return [player1, player2];
  });

  playAgain() {
    this.restartGame.emit();
  }
}
