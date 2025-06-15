import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
const backend = import.meta.env.VITE_RENDER_URL;

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backend}auth/register`, userData);
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Sign up failed. Please check your email or password.";
      return rejectWithValue(message);
    }
  }
);
export const signIn = createAsyncThunk(
  "auth/signin",
  async (userCreds, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backend}auth/login`, userCreds);

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Please check your email or password.";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:
      (() => {
        const raw = localStorage.getItem("user");
        return raw && raw !== "undefined" ? JSON.parse(raw) : null;
      })(),
    token: localStorage.getItem("token") || null,
    status: "idle",
    typeOfSession: localStorage.getItem("token") ? "loggedIn" : "anonyms",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.status = "idle";
      state.typeOfSession = "anonyms";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "signupLoading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "signupSucceeded";
        state.typeOfSession = "registered";
        // state.token = action.payload;
      })
      .addCase(signUp.rejected, (state) => {
        state.status = "signupFailed";
        state.typeOfSession = "anonyms";
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loginLoading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "LoginSucceeded";
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.typeOfSession = "loggedIn";
        // Persist to localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signIn.rejected, (state) => {
        state.status = "loginFailed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
