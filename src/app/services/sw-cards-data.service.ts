import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject, finalize,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  tap
} from 'rxjs';
import {
  PeopleProperties,
  StarshipsProperties, SWPeopleResults,
  SWResponse, SWStarshipsResults
} from "../models/data.model";
import {GOOGLE_API_KEY, SEARCH_ENGINE_KEY} from "../../env/env";

const API_URL = 'https://www.swapi.tech/api';

@Injectable({providedIn: 'root'})
export class SwCardsDataService {
  constructor(private http: HttpClient) {
    this.fetchAllStarshipIds().pipe(
      take(1),
      finalize(() => this.isLoading$.next(false))
    ).subscribe();
  }

  peopleTotalRecords$ = new BehaviorSubject<number>(0);
  starshipIds$ = new BehaviorSubject<number[]>([]);
  isLoading$ = new BehaviorSubject(true);

  fetchPeopleProperties(): Observable<PeopleProperties> {
    return this.peopleTotalRecords$.pipe(
      switchMap((totalRecords) => {
        if (totalRecords) {
          return this.fetchPeople(totalRecords);
        }
        return this.fetchTotalRecords('people').pipe(
          switchMap(totalRecords => {
            this.peopleTotalRecords$.next(totalRecords);
            return this.fetchPeople(totalRecords);
          })
        )
      })
    )
  }

  fetchStarshipsProperties(): Observable<StarshipsProperties> {
    return this.starshipIds$.pipe(
      switchMap(ids => {
        return this.fetchStarships(ids);
      })
    );
  }

  private fetchAllStarshipIds(page: number = 1, accumulatedIds: number[] = []): Observable<number[]> {
    return this.http.get<any>(`${API_URL}/starships?page=${page}&limit=10`).pipe(
      switchMap(response => {
        const ids = response.results.map((starship: any) => starship.uid);
        const allIds = [...accumulatedIds, ...ids];
        if (response.next) {
          return this.fetchAllStarshipIds(page + 1, allIds);
        } else {
          return of(allIds);
        }
      }),
      tap(ids => this.starshipIds$.next(ids))
    );
  }

  private fetchTotalRecords(entity: 'people' | 'starships'): Observable<number> {
    return this.http.get<SWResponse>(`${API_URL}/${entity}`).pipe(
      map(res => res.total_records)
    );
  }

  private fetchPeople(totalRecords: number): Observable<PeopleProperties> {
    const randomId = Math.floor(Math.random() * totalRecords) + 1;
    return this.http.get<SWPeopleResults>(`${API_URL}/people/${randomId}`).pipe(
      switchMap(data => {
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_KEY}&searchType=image&q=${encodeURIComponent(`star wars ${data.result.properties.name}`)}&imgSize=large`
        return this.http.get(url).pipe(
          map((res: any) => {
            return { ...data.result.properties, imageUrl: res.items[0].image.thumbnailLink }
          })
        );
      })
    )
  }

  private fetchStarships(ids: number[]) {
    const randomIndex = Math.floor(Math.random() * ids.length);
    const randomId = ids[randomIndex];
    return this.http.get<SWStarshipsResults>(`${API_URL}/starships/${randomId}`).pipe(
      switchMap(data => {
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_KEY}&searchType=image&q=${encodeURIComponent(`star wars ${data.result.properties.name}`)}&imgSize=large`
        return this.http.get(url).pipe(
          map((res: any) => {
            return { ...data.result.properties, imageUrl: res.items[0].image.thumbnailLink }
          })
        );
      })
    )
  }
}
