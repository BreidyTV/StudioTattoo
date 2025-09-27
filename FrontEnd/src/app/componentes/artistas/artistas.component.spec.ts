import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasComponent } from './artistas.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('ArtistasComponent', () => {
  let component: ArtistasComponent;
  let fixture: ComponentFixture<ArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistasComponent],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
