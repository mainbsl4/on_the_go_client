import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/users/userSlice'
import bankDetailsReducer from '../features/bankDetails/bankDetailsSlice'
import visaApplyReducer from '../features/visaApply/visaApplySlice'
import loanReducer from '../features/loan/loanSlice'
import uploadReducer from '../features/upload/uploadSlice'
import depositReducer from '../features/deposit/depositSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    bankDetails: bankDetailsReducer,
    visaApply: visaApplyReducer,
    deposit: depositReducer,
    loan: loanReducer,
    upload: uploadReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch