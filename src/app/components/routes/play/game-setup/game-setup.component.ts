import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Player, SetupOutput } from '../../../../shared/types';
import { map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rps-game-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      class="flex flex-col gap-2"
      [formGroup]="setupForm"
      (submit)="completeSetup()"
    >
      <div
        class="flex flex-col gap-1"
      >
        <label for="player1" class="font-medium">Player one</label>
        <input
          type="text"
          name="player1"
          id="player1"
          class=""
          [formControl]="setupForm.controls.player1"
          class="px-2 rounded border border-primary"
          [classList]=""
        >
      </div>

      <div
        class="flex flex-col gap-2"
      >
        <div
          class="flex flex-col gap-1"
        >
          <label for="player2-type" class="font-medium">Who will player 2 be?</label>
          <select
            name="player2-type"
            id="player2-type"
            class="w-fit"
            [formControl]="setupForm.controls.player2Type"
            (change)="playe2TypeChange($event)"
          >
            <option value="computer">
              Computer
            </option>
            <option value="player">
              Another player
            </option>
          </select>
        </div>

        <div
          class="flex flex-col"
        >
          <label for="player2" class="font-medium">Player two</label>
          <input
            type="text"
            name="player2"
            id="player2"
            [formControl]="setupForm.controls.player2"
            class="px-2 rounded border border-primary disabled:bg-transparent"
          >
        </div>
      </div>

        <label for="limit">
          Best out of
          <input
            type="number"
            name="limit"
            id="limit"
            min="1"
            [formControl]="setupForm.controls.limit"
            class="w-14 px-2 rounded border border-primary"
          >
          wins
        </label>

      <button
        class="py-2 px-5 rounded-md cursor-pointer disabled:cursor-not-allowed bg-primary disabled:bg-neutral-700 text-white"
        type="submit"
        [disabled]="submitDisabled | async"
      >
        Start the game
      </button>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameSetupComponent {
  @Output()
  setupComplete = new EventEmitter<SetupOutput>();

  setupForm = new FormGroup({
    player1: new FormControl('', Validators.required),
    player2: new FormControl(
      { value: 'Computer', disabled: true },
      Validators.required
    ),
    player2Type: new FormControl<Player['type']>('computer'),
    limit: new FormControl(1, Validators.min(1)),
  });

  submitDisabled = this.setupForm.statusChanges.pipe(
    startWith(this.setupForm.status),
    map((status) => status !== 'VALID')
  );

  // If computer is chosen in the drop down. the name feild should be disabled and set to just 'Computer'
  playe2TypeChange(_: Event) {
    const { player2Type } = this.setupForm.value;
    if (!player2Type) return;
    switch (player2Type) {
      case 'player':
        this.setupForm.controls.player2.setValue('');
        this.setupForm.controls.player2.enable();
        break;
      case 'computer':
        this.setupForm.controls.player2.setValue('Computer');
        this.setupForm.controls.player2.disable();
        break;
    }
  }

  // Send the completed from back to the parent component. Player one is always a real player
  completeSetup() {
    const { player1, player2, player2Type, limit} = this.setupForm.getRawValue();
    if (!player1 || !player2 || !player2Type || !limit) return;
    
    const setup: SetupOutput = {
      limit,
      player1: {
        type: 'player',
        name: player1,
      },
      player2: {
        type: player2Type,
        name: player2,
      }
    };

    this.setupComplete.emit(setup);
  }
}
