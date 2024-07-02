import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/users/userSlice'
import bankDetailsReducer from '../features/bankDetails/bankDetailsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    bankDetails: bankDetailsReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch