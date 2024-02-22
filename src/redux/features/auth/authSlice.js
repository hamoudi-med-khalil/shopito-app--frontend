import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';
import { toast } from 'react-toastify'

 
const initialState = {
  isLoggedIn : false,
  user : null,
  isError : false,
  isSuccess: false,
  isLoading: false,
  message: ''
}
//Register user

export const register = createAsyncThunk(
  'auth/register', 
  async (userData, ThunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      const message =
         (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString()
            return ThunkAPI.rejectWithValue(message)
    }
  }
)
//Login user

export const login = createAsyncThunk(
  'auth/login', 
  async (userData, ThunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      const message =
         (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString()
            return ThunkAPI.rejectWithValue(message)
    }
  }
)



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset : (state) => {
       state.isError = false
       state.isSuccess = false
       state.isLoading = false
       state.message = ''
  }
  },
  extraReducers: (builder) => {
    builder
          .addCase(register.pending, (state) => {
            state.isLoading = true
            })
          .addCase(register.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isLoggedIn = true
            state.user = action.payload
            toast.success('Regestration is Success')
            })
            .addCase(register.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              state.user = null
              toast.success('action.payload')
           })
          .addCase(login.pending, (state) => {
            state.isLoading = true
            })
          .addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isLoggedIn = true
            state.user = action.payload
            toast.success('Login is Success')
            })
            .addCase(login.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              state.user = null
              toast.success('action.payload')
           })

  }
});

export const {reset} = authSlice.actions

export default authSlice.reducer