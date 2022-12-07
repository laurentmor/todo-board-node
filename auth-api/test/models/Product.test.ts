import {connect,closeAndDisconnect,clearDatabase} from "../config/db";
//import   from "../../src/dao/index";
import {createProduct} from "../../src/dao";
describe("Product model test",()=>{
beforeAll(async ()=>connect());
afterAll(async ()=> await closeAndDisconnect());
afterEach(async ()=> await clearDatabase());
    it('First Test', async done => {
        const result = {word: "twelve",number:12}
        expect(result.word).toBe("twelve")
        expect(result.number).toBeGreaterThan(10)
        done()
    })
    it('Create a fruit',async done=>{
        const  product=await createProduct({name:"orange",category:"fruits",unit:200});

        expect(product.category).toBe("fruits")
        //expect(collectionProp[1]).toBe(1)
        done()
    })
    it("reject duplicate products",async done=>{
        await createProduct({name:"orange",category:"fruits",unit:200});
        await expect( createProduct({name:"orange",category:"fruits"})).rejects.toThrow();
        done()

    } );
});

