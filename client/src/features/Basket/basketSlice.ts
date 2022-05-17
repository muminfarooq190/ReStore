import { Basket } from "../../app/Models/Basket";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import agent from "../../app/Api/agent";

interface BasketState{
    basket : Basket | null,
    status : string
}

const initialState : BasketState = {
    basket : null,
    status : 'idle'
}
export const addBasketItemAsync = createAsyncThunk<Basket, {ProductId:number, quantity?:number}>(
    'basket/addBasketItemAsync',
    async({ProductId, quantity=1}, thunkAPI) =>{
        try{
            return await agent.Basket.addItem(ProductId, quantity);
        }
        catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, 
    {ProductId:number, quantity:number, name?:string}>(
    'basket/removeBasketItemAsync',
    async({ProductId, quantity}, thunkAPI) =>{
        try{
            await agent.Basket.removeItem(ProductId, quantity);
        }
        catch(error:any){
           return thunkAPI.rejectWithValue({error:error.data});
        }
    }
)

export const basketSlice = createSlice({
    name : 'basket',
    initialState,
    reducers : {
        setBasket :  (state: BasketState, action: { payload: any; }): void  =>{
            state.basket = action.payload
        }
    },
    extraReducers:(builder =>{
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingAddItem' + action.meta.arg.ProductId;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle'
        })
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            
            state.status = 'idle'
        })

        builder.addCase(removeBasketItemAsync.pending, (state, action) =>{
            state.status = 'pendingRemoveItem' + action.meta.arg.ProductId + action.meta.arg.name;
        })
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) =>{
            const {ProductId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex((i => i.productId === ProductId));
            if(itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;

            if(state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        })
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        })

        

    })
})

export const {setBasket} = basketSlice.actions;