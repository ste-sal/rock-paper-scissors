import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player, Sign } from '../../../../../shared/types';

@Component({
  selector: 'rps-player-turn',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-1 mb-3">
      <span class="font-medium">
        {{ player().name }}&apos;s turn to choose a sign
      </span>
      <span class="text-xs font-semibold">
        Please look away when it's not your turn
      </span>
    </div>
    
    <div
      class="flex flex-col gap-1 mb-5"
    >
      @for (sign of signs; track $index) {
        <span class="flex gap-1">
          <input
            type="radio"
            name="signs"
            id="{{sign}}"
            [value]="sign"
            [formControl]="signControl"
          >
          <label for="{{sign}}">{{sign.toUpperCase()}}</label>
        </span>
      }
    </div>

    <button
      [disabled]="controlDisabled()"
      (click)="chooseSign()"
      class="py-2 px-3 rounded-md cursor-pointer disabled:cursor-not-allowed bg-primary disabled:bg-neutral-700 text-white"
    >
      {{ controlDisabled() ? 'Choosing' : 'Choose'}}
    </button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerTurnComponent {
  player = input.required<Player>();

  @Output()
  signChosen = new EventEmitter<Sign>();

  signControl = new FormControl<Sign | null>(
    null,
    Validators.required
  );

  signs = Object.values(Sign);

  // Signal to know if to disable the choices so computer can choose
  controlDisabled = computed(() => {
    const isComputer = this.player().type === 'computer';
    if (isComputer) {
      this.signControl.disable();
      this.computerPicks();
    }
    return isComputer;
  });

  // GSelect a random choice for the computer
  computerPicks() {
    const computerChosen = Math.floor(Math.random() * 3);
    this.signControl.setValue(this.signs[computerChosen]);
    setTimeout(() => {
      this.chooseSign();
    }, 3000)
  }

  // When the sign has been chosen submit the results back to the parent component
  chooseSign() {
    const chosenSign = this.signControl.getRawValue();
    if (!chosenSign) return;
    this.signChosen.emit(chosenSign);
    this.signControl.reset();
  }
}
