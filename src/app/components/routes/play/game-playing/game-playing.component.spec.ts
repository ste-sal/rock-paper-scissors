import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayingComponent } from './game-playing.component';
import { SetupOutput } from '../../../../shared/types';

describe('GamePlayingComponent', () => {
  let component: GamePlayingComponent;
  let fixture: ComponentFixture<GamePlayingComponent>;

  const mockSetup: SetupOutput = {
    limit: 1,
    player1: {
      type: 'player',
      name: 'Player 1',
    },
    player2: {
      type: 'player',
      name: 'Player 2',
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePlayingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamePlayingComponent);
    fixture.componentRef.setInput('gameSetup', mockSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
