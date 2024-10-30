import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavListComponent } from './fav-list.component';

describe('FavListComponent', () => {
  let component: FavListComponent;
  let fixture: ComponentFixture<FavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
