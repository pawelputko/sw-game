import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwFormComponent } from './sw-form.component';

describe('AppComponent', () => {
  let component: SwFormComponent;
  let fixture: ComponentFixture<SwFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('changeCardType', () => {
    it('should set selectedType to People', () => {
      // given
      component.selectedType = 'Starships';

      // when
      component.changeCardType('People');

      // then
      expect(component.selectedType).toEqual('People');
    });

    it('should set selectedType to Starships', () => {
      // given
      component.selectedType = 'People';

      // when
      component.changeCardType('Starships');

      // then
      expect(component.selectedType).toEqual('Starships');
    });
  });

  it('should emit event', () => {
    // given
    const triggerFetchDataSpy = jest.spyOn(component.triggerFetchData, 'emit');

    // when
    component.getData();

    // then
    expect(triggerFetchDataSpy).toHaveBeenCalled();
  });
});
