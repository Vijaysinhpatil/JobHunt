import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import jobSlice from './jobSlice.js'
import companySlice from './companySlice.js'
import applicationslice from './applicationslice.js'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company : companySlice,
  application : applicationslice
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // only persist auth data
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store
