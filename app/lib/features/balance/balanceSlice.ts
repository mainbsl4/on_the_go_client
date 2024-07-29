import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BalanceState {
  totalAddedBalance: number;
}

const initialState: BalanceState = {
  totalAddedBalance: 0,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setTotalAddedBalance(state, action: PayloadAction<number>) {
      state.totalAddedBalance = action.payload;
    },
  },
});

export const { setTotalAddedBalance } = balanceSlice.actions;
export default balanceSlice.reducer;



// <Button
//                       variant="contained"
//                       size="large"
//                       startIcon={
//                         <Icon icon="material-symbols:download-sharp" />
//                       }
//                       onClick={() => handleDownloadVisa(selectedDataForView)}
//                     >
//                       Download Your Visa
//                     </Button>


// selectedDataForView?.sellingPrise