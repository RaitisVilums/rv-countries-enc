import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_DATA } from './mock';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart, HomeIcon } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  countries = [...MOCK_DATA];
  readonly Heart = Heart;
  readonly HomeIcon = HomeIcon;
}
