import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import customerReducer from './customer';
import productReducer from './product';
import categoryReducer from './category';
import cartReducer from './cart';
import orderReducer from './order';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
