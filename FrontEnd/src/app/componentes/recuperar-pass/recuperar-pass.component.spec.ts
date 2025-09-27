import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPassComponent } from './recuperar-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('RecuperarPassComponent', () => {
  let component: RecuperarPassComponent;
  let fixture: ComponentFixture<RecuperarPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarPassComponent,HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
