import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';
import catchErrors from '../services/catchErrors';

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  errors: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrders,
  clearOrders,
  setOrder,
  clearOrder,
  setErrors,
  clearErrors,
  setLoading,
} = orderSlice.actions;

export const getOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: '/api/orders',
      method: 'GET',
    });

    dispatch(setOrders(response.data.orders));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting orders: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: `/api/orders/${id}`,
      method: 'GET',
    });

    dispatch(setOrder(response.data.order));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting order: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export const createOrder = (token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axiosInstance({
      url: '/api/orders',
      method: 'POST',
      body: { token },
    });

    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while creating order: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export default orderSlice.reducer;
