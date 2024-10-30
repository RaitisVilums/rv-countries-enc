import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MOCK_DATA } from '../mock';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {
  country = MOCK_DATA;

  goBack() {}
}
