import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIsAuth } from 'shared/api';
import { AuthResponse } from 'shared/model/AuthModel';

export const fetchUserAuth = createAsyncThunk<AuthResponse, void, { rejectValue: null }>(
   'user/fetchUserAuth',
   async (_, thunkApi) => {
      const data = await fetchIsAuth().then((data) => (data ? data : null));

      if (!data) {
         return thunkApi.rejectWithValue(data);
      }

      return data;
   },
);
