import { Component, OnDestroy, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  catchError,
  combineLatest,
  EMPTY,
  Subject,
  takeUntil,
  tap
} from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SwCardsDataService } from './services/sw-cards-data.service';
import { CardType, PeopleProperties, StarshipsProperties } from './models/data.model';
import { SwFormComponent, SwScoreboardComponent, SwCardsComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    SwFormComponent,
    SwScoreboardComponent,
    SwCardsComponent,
    AsyncPipe,
    MatProgressSpinner
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  @ViewChild(SwScoreboardComponent) scoreboardComponent: SwScoreboardComponent | null = null;
  player1Card: PeopleProperties | StarshipsProperties | null = null;
  player2Card: PeopleProperties | StarshipsProperties | null = null;
  isLoading = this.swCardsDataService.isLoading$;

  player1ActionValue = 0;
  player2ActionValue = 0;

  player1Score = 0;
  player2Score = 0;

  winner: 'Player 1' | 'Player 2' | null = null;

  private unsubscribe$$ = new Subject<void>();

  constructor(private swCardsDataService: SwCardsDataService, private snackBar: MatSnackBar) {}

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  fetchPeopleData(): void {
    combineLatest({
      people1: this.swCardsDataService.fetchPeopleProperties(),
      people2: this.swCardsDataService.fetchPeopleProperties()
    }).pipe(
      takeUntil(this.unsubscribe$$),
      tap((data) => {
        this.player1Card = data.people1;
        this.player2Card = data.people2;

        this.player1ActionValue = Number(data.people1.mass) ? Number(data.people1.mass) : 0;
        this.player2ActionValue = Number(data.people2.mass) ? Number(data.people2.mass) : 0;
        this.determineWinner();
      }),
      catchError(() => {
        this.openWarning();
        return EMPTY;
      })
    ).subscribe();
  }

  fetchStarshipsData(): void {
    combineLatest({
      starship1: this.swCardsDataService.fetchStarshipsProperties(),
      starship2: this.swCardsDataService.fetchStarshipsProperties()
    }).pipe(
      takeUntil(this.unsubscribe$$),
      tap(data => {
        this.player1Card = data.starship1;
        this.player2Card = data.starship2;

        this.player1ActionValue = Number(data.starship1.crew) ? Number(data.starship1.crew) : 0;
        this.player2ActionValue = Number(data.starship2.crew) ? Number(data.starship2.crew) : 0;
        this.determineWinner();
      }),
      catchError(() => {
        this.openWarning();
        return EMPTY;
      })
    ).subscribe()
  }

  fetchData(selectedType: CardType): void {
    this.winner = null;
    this.player1Card = null;
    this.player2Card = null;
    switch (selectedType) {
      case 'People':
        this.fetchPeopleData();
        break;
      case 'Starships':
        this.fetchStarshipsData();
        break;
    }
  }

  determineWinner(): void {
    if (this.player1ActionValue === this.player2ActionValue) {
      return;
    }
    this.winner = this.player1ActionValue > this.player2ActionValue ? 'Player 1' : 'Player 2';
    this.winner === 'Player 1' ? this.player1Score++ : this.player2Score++;
    const table = this.scoreboardComponent?.table;
    const rowData = this.scoreboardComponent?.tableData.find(row => row.playerName === this.winner);
    if (rowData) {
      rowData.score = rowData.playerName === 'Player 1' ? this.player1Score : this.player2Score;
      table?.renderRows();
    }
  }

  openWarning(): void {
    this.snackBar.open('Something wrong, please try again!', 'Dismiss', {
      panelClass: 'sw-snackbar'
    });
  }
}
