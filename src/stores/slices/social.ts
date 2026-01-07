
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import Api from "../../config/api.config"


export type socialMediaData = {
    _id: string;
    createdAt: string;
    updatedAt: string;
    name: string,
    url: string,
    iconKey: string,
    isVisible: boolean,
    order: number
};


interface initialSlicePops {
    loading: boolean,
    data: socialMediaData[] | null,
    error: any | null
}

const initialSlice: initialSlicePops = {
    loading: false,
    data: null,
    error: null
}

const socialSlice = createSlice({
    name: "section/slice",
    initialState: initialSlice,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(GetAllMedia.pending, (state) => {
            state.loading = true
        }).addCase(GetAllMedia.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data as socialMediaData[];
            state.error = null;
        }).addCase(GetAllMedia.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.error;
        }).addCase(ChangeVisiablillity.fulfilled, (state, action) => {
            if (!state.data) return;
            const social = action.payload.data as socialMediaData;
            const target = state.data.find(item => item._id === social._id);
            if (target) target.isVisible = social.isVisible;
        }).addCase(DeleteMedia.fulfilled, (state, action) => {
            if (!state.data) return;
            if (action.payload.success) {
                state.data = state.data.filter(item => item._id !== action.meta.arg)
            }
        }).addCase(CreateMedia.fulfilled, (state, action) => {
            if (!state.data) return;
            if (action.payload.success) {
                state.data.unshift(action.payload.data);
            }
        }).addCase(UpdateMedia.fulfilled, (state, action) => {
            if (!state.data) return;
            const updatedValue = action.payload.data;
            let target = state.data.find(media => media._id === updatedValue._id);
            if (target) {
                target = updatedValue
            };
        })

    }
})


export const GetAllMedia = createAsyncThunk("social/getAll", async (_, ThunkApi) => {
    try {
        return (await Api.get("/social/")).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})
export const CreateMedia = createAsyncThunk("social/create", async (data: Partial<socialMediaData>, ThunkApi) => {
    try {
        return (await Api.post("/social/", data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})
export const UpdateMedia = createAsyncThunk("social/update", async (updatedData: { data: Partial<socialMediaData>, id: string }, ThunkApi) => {
    try {
        return (await Api.put(`/social/${updatedData.id}`, updatedData.data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})


export const ChangeVisiablillity = createAsyncThunk("social/change-visible", async (id: string, ThunkApi) => {
    try {
        return (await Api.get(`/social/visible/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const DeleteMedia = createAsyncThunk("social/delete", async (id: string, ThunkApi) => {
    try {
        return (await Api.delete(`/social/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})



export default socialSlice.reducer