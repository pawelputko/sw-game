import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import { NgIf } from '@angular/common';
import { PeopleProperties, StarshipsProperties } from '../../../models/data.model';

@Component({
  selector: 'sw-card',
  templateUrl: './sw-card.component.html',
  styleUrls: ['./sw-card.component.scss'],
  imports: [
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgIf
  ],
  standalone: true
})
export class SwCardComponent {
  @Input() cardDetails: PeopleProperties | StarshipsProperties | null = null;
  @Input() actionValue = 0;
}
