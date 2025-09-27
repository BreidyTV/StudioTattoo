import { TestBed } from '@angular/core/testing';
import { PeticionService } from './peticion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PeticionService', () => {
  let service: PeticionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeticionService]
    });
    service = TestBed.inject(PeticionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ("Validar la petición tipo post", async() => {

    const mokupURL = service.urlReal + "/usualios/login"
    const mokupPayload = {email:"",password:""}
    const mockResponse = { state: false, mensaje: "El campo correo electrónico es obligatorio" };

    // service.post(mokupURL,mokupPayload).then((res:any) => {
    //   expect(res).toEqual({state:false, mensaje:"El campo correo electrónico es obligatorio"})
    //   done()
    // })

    // Ejecutamos el método
    const promise = service.post(mokupURL, mokupPayload);

    // Interceptamos la petición HTTP
    const req = httpMock.expectOne(mokupURL);
    expect(req.request.method).toBe('POST');

    // Respondemos con un mock
    req.flush(mockResponse);

    // Esperamos la promesa
    const res = await promise;
    expect(res).toEqual(mockResponse);
  
  })

});
