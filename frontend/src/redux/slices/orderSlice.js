import {createSlice, createAsyncThnk}from "@reduxjs/toolkit";
import axios from "axios";
import OrderDetails from "../../pages/OrderDetails";
//async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async(_,{rejectWithValue})=>{
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
                {
                    headers:{
                        Authorization:`Baerer ${localStorage.getItem("userItem")}`,
                    }
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.date);
        }
    }
)


//asyync thunuk to fetch orders details by id
export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails",
    async(fetchOrderDetails,{rejectWithValue})=>{
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
                {
                    headers:{
                        Authorization:`Baerer ${localStorage.getItem("userToken")}`,
                    }
                }
            )
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)


const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        totalOrder:0,
        orderDetails:null,
        loading:false,
        error:null,
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        //fetch user orders
        .addCase(fetchUserOrders.pending,(state)=>{
            state.loading = true;
            state.error=null;
        })
        .addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders=action.payload;
        })
        .addCase(fetchUserOrders.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload.message;
        })
        //fetch order details
        .addCase(fetchOrderDetails.pending,(state)=>{
            state.loading = true;
            state.error=null;
        })
        .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.orderDetails=action.payload;
        })
        .addCase(fetchOrderDetails.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload.message;
        });
            
    },
});

export default orderSlice.reducer;
