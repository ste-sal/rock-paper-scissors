import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  input
} from '@angular/core';
import { APlayer, PossibleResult, RoundChoice, SetupOutput, Sign, signValue } from '../../../../../shared/types';

@Component({
  selector: 'rps-round-result',
  standalone: true,
  imports: [],
  template: `
    @for (player of keys; track $index) {
      <div
        class="flex gap-1"
      >
        <span class="font-semibold">
          {{ setupOutput[player].name }}
        </span>
        <span>chose &hyphen;</span>
        <span class="font-semibold">
          {{ roundChoice()[player] }}
        </span>
      </div>
    }
    
    <p>
      The winner is:
      <span
        class="font-bold"
      >
        {{winnerText()}}
      </span>
    </p>

    <button
      class="py-2 px-4 rounded-md bg-primary text-white"
      (click)="continue()"
    >
      Continue
    </button>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundResultComponent {
  @Input({ required: true })
  setupOutput!: SetupOutput;
  roundChoice = input.required<RoundChoice>();
  
  @Output()
  winnerChecked = new EventEmitter<APlayer | undefined>();
  @Output()
  onContinue = new EventEmitter();

  // Signal to calculate the winner of the round based on the cpices input
  winner = computed(() => {
    const choices = this.roundChoice()
    const player1WinLose = this.checkSign1Result(
      choices.player1,
      choices.player2
    );

    const winnigPlayer = player1WinLose === 'win' ?
      'player1' : player1WinLose === 'lose' ? 'player2' : undefined;
    
    this.winnerChecked.emit(winnigPlayer);
    return winnigPlayer
  });

  // Calculate the output text to the screen
  winnerText = computed(() => {
    const playerWin = this.winner();
    return !!playerWin ? this.setupOutput[playerWin].name : 'no one, it was a draw';
  });

  keys: APlayer[] = ['player1', 'player2'];

  // Checks the results on the match for Player 1's chosen sign.
  checkSign1Result(sign1: Sign, sign2: Sign): PossibleResult {
    const signValue1 = signValue[sign1];
    const signValue2 = signValue[sign2];

    if (signValue1 === signValue2) return 'draw';
    if (signValue1 === 1 && signValue2 === 3) return 'win';
    if (signValue1 === 3 && signValue2 === 1) return 'lose';

    return signValue1 < signValue2 ? 'lose' : 'win';
  }

  // When continue button is clicked
  continue() {
    this.onContinue.emit();
  }
}
