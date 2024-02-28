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
//Logout user

export const logout = createAsyncThunk(
  'auth/logout', 
  async (_, ThunkAPI) => {
    try {
      return await authService.logout()
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


//Get login Status user

export const getLoginStatus = createAsyncThunk(
  'auth/getloginstatus', 
  async (_, ThunkAPI) => {
    try {
      return await authService.getLoginStatus()
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


//Get User  

export const getUser = createAsyncThunk(
  'auth/getuser', 
  async (_, ThunkAPI) => {
    try {
      return await authService.getUser()
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
//Update User  

export const updateUser = createAsyncThunk(
  'auth/updateuser', 
  async (userData, ThunkAPI) => {
    try {
      return await authService.updateUser(userData)
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



export const updatePhoto = createAsyncThunk(
  'auth/updatephoto', 
  async (userData, ThunkAPI) => {
    try {
      return await authService.updatePhoto(userData)
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
              toast.success(action.payload)
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
            console.log(action.payload)
            })
            .addCase(login.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              state.user = null
              toast.success(action.payload)
           })
         
          .addCase(logout.pending, (state) => {
            state.isLoading = true
            })
          .addCase(logout.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isLoggedIn = false
            state.user = null
            toast.success(action.payload)
            console.log(action.payload)
            })
            .addCase(logout.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              toast.error(action.payload)
           })
         
          .addCase(getLoginStatus.pending, (state) => {
            state.isLoading = true
            })
          .addCase(getLoginStatus.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isLoggedIn = action.payload
            if(action.payload.message === 'invalid signature'){
              state.isLoggedIn = false
            } 
            console.log(action.payload)
            })
            .addCase(getLoginStatus.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
           })
         
          .addCase(getUser.pending, (state) => {
            state.isLoading = true
            })
          .addCase(getUser.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isLoggedIn = true
            state.user = action.payload
            console.log(action.payload)
            })

            .addCase(getUser.rejected, (state, action) =>{
              state.isLoading = false
              state.isError = true
              state.message = action.payload
           })

          .addCase(updateUser.pending, (state) => {
            state.isLoading = true
            })

          .addCase(updateUser.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isLoggedIn = true
            state.user = action.payload
            toast.success('User Updated')

            console.log(action.payload)
            })

            .addCase(updateUser.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload

           })

          .addCase(updatePhoto.pending, (state) => {
            state.isLoading = true
            })
          .addCase(updatePhoto.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isLoggedIn = true
            state.user = action.payload
            toast.success('User Updated')
            console.log(action.payload)
            })
            .addCase(updatePhoto.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload

           })
         

  }
});

export const {reset} = authSlice.actions

export default authSlice.reducer