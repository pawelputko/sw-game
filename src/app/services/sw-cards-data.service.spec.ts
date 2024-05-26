import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwCardsDataService } from './sw-cards-data.service';
import {PeopleProperties} from "../models/data.model";

const API_URL = 'https://www.swapi.tech/api';

describe('SwCardsDataService', () => {
  let service: SwCardsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwCardsDataService]
    });
    service = TestBed.inject(SwCardsDataService);
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne(`${API_URL}/starships?page=1&limit=10`);
  });

  it('should fetch people data', () => {
    // given
    const peopleProperties = {name: 'Han Solo'} as PeopleProperties;
    service.peopleTotalRecords$.next(1);

    // when
    service.fetchPeopleProperties().subscribe(data => {
      expect(data.name).toEqual('Han Solo')
    });

    // then
    const req = httpMock.expectOne(`${API_URL}/people/1`);
    expect(req.request.method).toBe('GET');
    req.flush(peopleProperties);
  });

  it('should fetch starships data', () => {
    // given
    const peopleProperties = {name: 'Han Solo'} as PeopleProperties;
    service.starshipIds$.next([5]);

    // when
    service.fetchStarshipsProperties().subscribe(data => {
      expect(data.name).toEqual('Han Solo')
    });

    // then
    const req = httpMock.expectOne(`${API_URL}/starships/5`);
    expect(req.request.method).toBe('GET');
    req.flush(peopleProperties);
  });
});
