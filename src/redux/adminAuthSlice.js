import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosConfig';
export const loginAdmin = createAsyncThunk(
    'adminAuth/loginAdmin',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/login', { username, password });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        adminLogout: (state) => {
            state.admin = null;
            state.token = null;
            state.user = null;
        },
        updateAdminProfile: (state, action) => {
            state.admin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.role;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { adminLogout, updateAdminProfile } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;