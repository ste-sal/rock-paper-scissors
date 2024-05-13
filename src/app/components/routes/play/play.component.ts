import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GameResults, GameStatus, SetupOutput } from '../../../shared/types';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GamePlayingComponent } from './game-playing/game-playing.component';
import { GameEndComponent } from './game-end/game-end.component';

@Component({
  selector: 'rps-play',
  standalone: true,
  imports: [GameSetupComponent, GamePlayingComponent, GameEndComponent],
  template: `
    <h2
      class="text-2xl font-bold mb-5 text-neutral-800"
    >
      {{ stateTitle() }}
    </h2>
    @switch (gameState()) {
      @case ('setup') {
        <rps-game-setup (setupComplete)="startGame($event)" />
      }
      @case ('playing') {
        @if(gameSetup(); as setup) {
          <rps-game-playing
            [gameSetup]="setup"
            (gameEnded)="endGame($event)"
          />
        }
      }
      @case ('end') {
        @if(gameResults(); as results) {
          <rps-game-end
            [results]="results"
            (restartGame)="restartGame()"
          />
        }
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayComponent {
  gameState = signal<GameStatus>('setup');
  gameSetup = signal<SetupOutput | undefined>(undefined);
  gameResults = signal<GameResults | undefined>(undefined);
  
  stateTitle = computed(() => {
    switch(this.gameState()) {
      case 'setup':
        return 'Who will be playing?';
      case 'playing':
        return 'The game is underway...';
      case 'end':
        return 'The game is over!';
    }
  });
  
  // Trigger a start to the game when the setup object is received. The next component is rendered
  startGame(setup: SetupOutput) {
    this.gameSetup.set(setup);
    this.gameState.set('playing');
  }
  
  // End the game when a results object is received. Should render the results component
  endGame(results: GameResults) {
    this.gameResults.set(results);
    this.gameState.set('end');
  }

  // Start the gae again getting the players and game limit. Should render the setup form again
  restartGame() {
    this.gameSetup.set(undefined);
    this.gameResults.set(undefined);
    this.gameState.set('setup');
  }
}
