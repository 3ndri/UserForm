import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
