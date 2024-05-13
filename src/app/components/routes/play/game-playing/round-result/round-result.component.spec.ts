import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundResultComponent } from './round-result.component';
import { mockRoundChoices, mockSetup } from '../../testing/mockData';

describe('RoundResultComponent', () => {
  let component: RoundResultComponent;
  let fixture: ComponentFixture<RoundResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoundResultComponent);
    fixture.componentRef.setInput('setupOutput', mockSetup);
    fixture.componentRef.setInput('roundChoice', mockRoundChoices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
