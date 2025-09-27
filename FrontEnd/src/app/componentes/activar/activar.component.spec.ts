import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarComponent } from './activar.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HttpClientModule } from '@angular/common/http';

describe('ActivarComponent', () => {
  let component: ActivarComponent;
  let fixture: ComponentFixture<ActivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivarComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
