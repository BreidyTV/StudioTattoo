import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComponent } from './productos.component';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '../../app.routes';
import { provideRouter } from '@angular/router';

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponent,HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
