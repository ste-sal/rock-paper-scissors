import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
  signal
} from '@angular/core';
import { APlayer, GameResults, RoundChoice, SetupOutput, Sign } from '../../../../shared/types';
import { PlayerTurnComponent } from './player-turn/player-turn.component';
import { RoundResultComponent } from './round-result/round-result.component';

type RoundState = 'choosing' | 'result';

@Component({
  selector: 'rps-game-playing',
  standalone: true,
  imports: [PlayerTurnComponent, RoundResultComponent],
  template: `
    <div
      class="mb-5"
    >
      <h5 class="text-md">
        Round 
        <span class="font-semibold">{{ roundCount() }}</span>
        of {{ gameSetup().limit }}
      </h5>
      <div
        class="flex gap-3 text-sm"
      >
        <span>
          {{ gameSetup().player1.name }}:
          <span class="font-medium">
            {{ scores().player1 }}
          </span>
        </span>
        <span>
          {{ gameSetup().player2.name }}: 
          <span class="font-medium">
            {{ scores().player2 }}
          </span>
        </span>
      </div>
    </div>
    
    @switch (roundState()) {
      @case ('choosing') {
        <rps-player-turn
          [player]="playerChoosing() === 'player1' ? gameSetup().player1 : gameSetup().player2"
          (signChosen)="signChosen($event)"
        />
      }
      @case ('result') {
        <rps-round-result
          [roundChoice]="roundChoice!"
          [setupOutput]="gameSetup()"
          (winnerChecked)="roundWinner($event)"
          (onContinue)="continue()"
        />
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePlayingComponent {
  gameSetup = input.required<SetupOutput>();

  @Output()
  gameEnded = new EventEmitter<GameResults>();

  roundState = signal<RoundState>('choosing');
  roundCount = signal(1);
  playerChoosing = signal<APlayer>('player1');
  scores = signal({ 
    player1: 0,
    player2: 0,
  });

  private player1Choice?: Sign;
  roundChoice?: RoundChoice;

  // Save the sign that was chosen by the user.
  // When both signs have been received, trigger the round result to check who won
  signChosen(sign: Sign) {
    switch (this.playerChoosing()) {
      case 'player1':
        this.player1Choice = sign;
        this.playerChoosing.set('player2');
        break;
  
      case 'player2':
        this.roundChoice = {
          player1: this.player1Choice || Sign.Paper,
          player2: sign
        };
        this.roundState.set('result');
        break
    }
  }

  // When a round has been checked increment the winning players score is there is a winner.
  roundWinner(aPlayer?: APlayer) {
    if (!aPlayer) return;
    this.scores.update((s) => ({ ...s, [aPlayer]: s[aPlayer] + 1 }));
  }

  // Continue if there are still more rounds to be played.
  // End to the final results screen if all rounds have been played.
  continue() {
    let round = this.roundCount();
    const playerScores = this.scores();
    const { limit, player1, player2 } = this.gameSetup();
    if (++round <= limit) {
      this.roundCount.set(round);
      this.playerChoosing.set('player1');
      this.roundState.set('choosing');
      return;
    }

    const winner: APlayer | undefined = playerScores.player1 === playerScores.player2 ? 
      undefined : playerScores.player1 > playerScores.player2 ? 'player1' : 'player2';
    this.gameEnded.emit({
      limit,
      winner,
      player1: {
        ...player1,
        score: playerScores.player1,
      },
      player2: {
        ...player2,
        score: playerScores.player2,
      },
    });
  }
}
