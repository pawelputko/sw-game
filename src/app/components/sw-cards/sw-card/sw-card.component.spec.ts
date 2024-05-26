import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwCardComponent } from './sw-card.component';

describe('SwCardComponent', () => {
  let component: SwCardComponent;
  let fixture: ComponentFixture<SwCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
