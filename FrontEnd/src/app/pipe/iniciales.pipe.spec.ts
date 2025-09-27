import { InicialesPipe } from './iniciales.pipe';

describe('InicialesPipe', () => {
  it('create an instance', () => {
    const pipe = new InicialesPipe();
    expect(pipe).toBeTruthy();
  });


  it("Captura las iniciales de las primeras dos palabras de un string (Nombre)", () => {
    const pipe = new InicialesPipe();
    let resultado = pipe.transform("Breidy Trejos Velandia")
    expect(resultado).toBe("BT")
  })



});
