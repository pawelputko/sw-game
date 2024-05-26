import {ComponentFixture, TestBed} from "@angular/core/testing";
import {SwScoreboardComponent} from "./sw-scoreboard.component";

describe('SwScoreboardComponent', () => {
  let component: SwScoreboardComponent;
  let fixture: ComponentFixture<SwScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwScoreboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwScoreboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
