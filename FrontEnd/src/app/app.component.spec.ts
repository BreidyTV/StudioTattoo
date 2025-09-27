import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'FrontEnd' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FrontEnd');        //.toEqual es igual a .toBe
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();

  //   //const compiled = fixture.nativeElement as HTMLElement;                                      //ej con <h1> en HTML
  //   //expect(compiled.querySelector('h1')?.textContent).toContain('Hello, FrontEnd');

  //   //var x = document.getElementById("Hola")?.innerHTML                                            //ej con <div> en HTML
  //   //expect(x).toBe("1")

  //   const compiled = fixture.nativeElement as HTMLElement;                                      //ej con <div> en HTML con metodo que ofrece Angular
  //   expect(compiled.querySelector('#Hola')?.textContent).toContain('1');

  // });
});
