import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // Add reducers here as they are created
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
