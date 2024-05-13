import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GameEndComponent } from './game-end.component';
import { mockResults } from '../testing/mockData';

describe('GameEndComponent', () => {
  let component: GameEndComponent;
  let fixture: ComponentFixture<GameEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameEndComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameEndComponent);
    fixture.componentRef.setInput('results', mockResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
