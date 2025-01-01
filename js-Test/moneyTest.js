import { currencyCheck } from "../script.js/additionalFn.js";

describe('checking Money Cases',()=>{
    describe('Easy cases',()=>{
        it('check money Converted it correctly',()=>{
            expect(currencyCheck(2095)).toEqual('20.95');
        })
    })
   
    describe('Money Edge Cases',()=>{
        it('check money correctly handles 0',()=>{
            expect(currencyCheck(0)).toEqual('0.00');
        })
        it('check money handles rounding',()=>{
            expect(currencyCheck(2000.5)).toEqual('20.01');
        })
    })
})
