
import "@testing-library/jest-dom/extend-expect";
import filterVideosByGenre from "../Redux/actions";

describe("La funcion filterVideosByGenre", ()=>{
    it("Debe ser una funcion",()=>{
       expect(typeof filterVideosByGenre).toBe("function")
    })

    xit("Debe recibir un string como parametro del genero",()=>{

    })

    xit("Debe retornar un array de objetos",()=>{

    })
})