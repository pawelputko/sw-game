import {Component, EventEmitter, Output} from "@angular/core";
import { CardType } from "../../models/data.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'sw-form',
  templateUrl: './sw-form.component.html',
  styleUrls: ['./sw-form.component.scss'],
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule],
  standalone: true
})
export class SwFormComponent {
  @Output() triggerFetchData: EventEmitter<CardType> = new EventEmitter<CardType>();
  cardTypes: CardType[] = ['People', 'Starships'];
  selectedType: CardType = 'People';

  changeCardType(type: CardType): void {
    this.selectedType = type;
  }

  getData(): void {
    this.triggerFetchData.emit(this.selectedType);
  }
}
