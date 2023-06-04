import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, IToken, IUser } from 'shared/model/AuthModel';
import { fetchUserAuth } from './fetchUserAuth';

interface IinitialStateUser extends AuthResponse {
   auth: boolean;
}

const initialState: IinitialStateUser = {
   auth: false,
   user: {} as IUser,
   tokens: {} as IToken,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateAuthState: (state, action: PayloadAction<IinitialStateUser>) => {
         state.auth = action.payload.auth;
         state.user = action.payload.user;
         state.tokens = action.payload.tokens;
         console.log(state);
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchUserAuth.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
         state.auth = true;
         state.user = action.payload.user;
         state.tokens = action.payload.tokens;
      });
   },
});
export const { updateAuthState } = userSlice.actions;
export default userSlice.reducer;
