import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTurnComponent } from './player-turn.component';
import { mockPlayer } from '../../testing/mockData';

describe('PlayerTurnComponent', () => {
  let component: PlayerTurnComponent;
  let fixture: ComponentFixture<PlayerTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTurnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerTurnComponent);
    fixture.componentRef.setInput('player', mockPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
