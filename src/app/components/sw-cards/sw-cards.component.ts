import { Component, Input } from "@angular/core";
import { NgIf } from "@angular/common";
import { MatLabel } from "@angular/material/form-field";
import { PeopleProperties, StarshipsProperties } from "../../models/data.model";
import { SwCardComponent } from "./sw-card/sw-card.component";

@Component({
  selector: 'sw-cards',
  templateUrl: './sw-cards.component.html',
  styleUrls: ['./sw-cards.component.scss'],
  standalone: true,
  imports: [
    MatLabel,
    NgIf,
    SwCardComponent
  ]
})
export class SwCardsComponent {
  @Input() player1Card: PeopleProperties | StarshipsProperties | null = null;
  @Input() player2Card: PeopleProperties | StarshipsProperties | null = null;

  @Input() player1ActionValue = 0;
  @Input() player2ActionValue = 0;
}
