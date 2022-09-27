import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';
import catchErrors from '../services/catchErrors';

const initialState = {
  cart: [],
  total: 0,
  isLoading: false,
  errors: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
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
export const { setCart, setTotal, setErrors, clearErrors, setLoading } =
  cartSlice.actions;

// --------------------------------------------------------

export const getCartItems = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: '/api/cart',
      method: 'GET',
    });

    dispatch(setCart(response.data.cart));
    dispatch(setTotal(response.data.total));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting cart: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

// --------------------------------------------------------

export const addToCart = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axiosInstance({
      url: '/api/cart/add-item',
      method: 'POST',
      body: { product_id: id },
    });

    await dispatch(getCartItems());
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while adding to cart: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

// --------------------------------------------------------

export const removeFromCart = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axiosInstance({
      url: '/api/cart/remove-item',
      method: 'POST',
      body: { product_id: id },
    });

    await dispatch(getCartItems());
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while removing from cart: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

// --------------------------------------------------------

export default cartSlice.reducer;
