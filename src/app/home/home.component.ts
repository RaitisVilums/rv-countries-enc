import { Component, OnInit } from '@angular/core';
import { MOCK_DATA } from '../mock';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly Search = Search;
  countries: any[] = [];
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
}