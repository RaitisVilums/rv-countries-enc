import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { FavoritesService } from '../services/favorites.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-favorites-checkbox',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <input
      class="favlist__input"
      type="checkbox"
      [id]="checkboxId"
      (change)="onToggleFavorite($event)"
      [checked]="isFavorite"
    />
    <label class="btn favlist" [for]="checkboxId">
      <lucide-angular [img]="Heart" class="favlist__icon"></lucide-angular>
    </label>
  `,
  styleUrls: ['./favorites-checkbox.component.scss'],
})
export class FavoritesCheckboxComponent implements OnInit {
  readonly Heart = Heart;

  @Input() country!: Country;
  @Input() uniqueId!: string;

  isFavorite = false;
  checkboxId!: string;

  constructor(private favService: FavoritesService) {}

  ngOnInit() {
    this.checkboxId = `toggle-${this.uniqueId}`;
    this.isFavorite = this.favService.isFavorite(this.country);
  }

  onToggleFavorite(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.favService.addFavorite(this.country);
    } else {
      this.favService.removeFavorite(this.country);
    }
    this.isFavorite = isChecked;
  }
}
