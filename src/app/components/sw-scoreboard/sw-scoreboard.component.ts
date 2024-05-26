import {Component, Input, ViewChild} from "@angular/core";
import {MatTable, MatTableModule} from "@angular/material/table";

@Component({
  selector: 'sw-scoreboard',
  templateUrl: './sw-scoreboard.component.html',
  styleUrls: ['./sw-scoreboard.component.scss'],
  standalone: true,
  imports: [MatTableModule]
})
export class SwScoreboardComponent {
  @ViewChild(MatTable) table: MatTable<any> | null = null;
  @Input() player1Score = 0;
  @Input() player2Score = 0;

  tableData = [{playerName: 'Player 1', score: this.player1Score}, {playerName: 'Player 2', score: this.player2Score}]
  displayedColumns: string[] = ['playerName', 'score'];
}
