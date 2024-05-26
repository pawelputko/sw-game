import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SwCardsDataService } from "./services/sw-cards-data.service";
import {PeopleProperties, StarshipsProperties} from "./models/data.model";
import {of, throwError} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let swCardsDataService: SwCardsDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [SwCardsDataService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    swCardsDataService = TestBed.inject(SwCardsDataService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchPeopleData', () => {
    it('should set players cards data', () => {
      // given
      const people1 = {mass: '123', name: 'Han Solo'} as PeopleProperties;
      const people2 = {mass: '323', name: 'Darth Vader'} as PeopleProperties;

      jest.spyOn(swCardsDataService, 'fetchPeopleProperties').mockReturnValueOnce(of(people1));
      jest.spyOn(swCardsDataService, 'fetchPeopleProperties').mockReturnValueOnce(of(people2));

      // when
      component.fetchPeopleData();

      // then
      expect(component.player1Card).toEqual(people1);
      expect(component.player1ActionValue).toEqual(123);
      expect(component.player2Card).toEqual(people2);
      expect(component.player2ActionValue).toEqual(323);
    });

    it('should call openWarning after error', () => {
      // given
      const openWarningSpy = jest.spyOn(component, 'openWarning');
      jest.spyOn(swCardsDataService, 'fetchPeopleProperties').mockReturnValue(throwError(() => 'err'));

      // when
      component.fetchPeopleData();

      // then
      expect(openWarningSpy).toHaveBeenCalled();
    });
  });

  describe('fetchStarshipsData', () => {
    it('should set players cards data', () => {
      // given
      const starship1 = {crew: '12345', name: 'Death Star'} as StarshipsProperties;
      const starship2 = {crew: '323', name: 'Falcon Millennium'} as StarshipsProperties;

      jest.spyOn(swCardsDataService, 'fetchStarshipsProperties').mockReturnValueOnce(of(starship1));
      jest.spyOn(swCardsDataService, 'fetchStarshipsProperties').mockReturnValueOnce(of(starship2));

      // when
      component.fetchStarshipsData();

      // then
      expect(component.player1Card).toEqual(starship1);
      expect(component.player1ActionValue).toEqual(12345);
      expect(component.player2Card).toEqual(starship2);
      expect(component.player2ActionValue).toEqual(323);
    });

    it('should call openWarning after error', () => {
      // given
      const openWarningSpy = jest.spyOn(component, 'openWarning');
      jest.spyOn(swCardsDataService, 'fetchStarshipsProperties').mockReturnValue(throwError(() => 'err'));

      // when
      component.fetchStarshipsData();

      // then
      expect(openWarningSpy).toHaveBeenCalled();
    });
  });

  describe('fetchData', () => {
    it('should call fetchPeopleData if selectedType is People', () => {
      // given
      const fetchPeopleDataSpy = jest.spyOn(component, 'fetchPeopleData');

      // when
      component.fetchData('People');

      // then
      expect(fetchPeopleDataSpy).toHaveBeenCalled();
    });

    it('should call fetchStarshipsData if selectedType is Starships', () => {
      // given
      const fetchStarshipsDataSpy = jest.spyOn(component, 'fetchStarshipsData');

      // when
      component.fetchData('Starships');

      // then
      expect(fetchStarshipsDataSpy).toHaveBeenCalled();
    });

    it('should reset cards and winner', () => {
      // given
      component.winner = 'Player 1';
      component.player1Card = {name: 'test'} as PeopleProperties;
      component.player2Card = {name: 'test'} as PeopleProperties;

      // when
      component.fetchData('Starships');

      // then
      expect(component.winner).toEqual(null);
      expect(component.player1Card).toEqual(null);
      expect(component.player2Card).toEqual(null);
    });
  });

  describe('determineWinner', () => {
    it('should return if action values are equal', () => {
      // given
      component.player1ActionValue = 11;
      component.player2ActionValue = 11;

      // when
      component.determineWinner();

      // then
      expect(component.winner).toEqual(null);
    });

    it('should set winner to Player 1', () => {
      // given
      component.player1ActionValue = 20;
      component.player2ActionValue = 11;

      // when
      component.determineWinner();

      // then
      expect(component.winner).toEqual('Player 1');
    });

    it('should set winner to Player 2', () => {
      // given
      component.player1ActionValue = 0;
      component.player2ActionValue = 11;

      // when
      component.determineWinner();

      // then
      expect(component.winner).toEqual('Player 2');
    });
  });
});
