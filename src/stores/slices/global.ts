
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import Api from "../../config/api.config"


export type GlobalSetting = {
    _id: string;
    createdAt: string;
    updatedAt: string;
    contact: {
        email: string,
        phone: string,
        address: string,
    },
    cvLink: string
    personalImage: string
};




interface initialSlicePops {
    loading: boolean,
    data: GlobalSetting | null,
    error: any | null
}

const initialSlice: initialSlicePops = {
    loading: false,
    data: null,
    error: null
}

const globalSlice = createSlice({
    name: "section/slice",
    initialState: initialSlice,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(GetGlobalById.pending, (state) => {
            state.loading = true
        }).addCase(GetGlobalById.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data as GlobalSetting;
            state.error = null;
        }).addCase(GetGlobalById.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.error;
        }).addCase(UpdateGlobalSetting.fulfilled, (state, action) => {
            state.data = action.payload.data
        })

    }
})


export const GetGlobalById = createAsyncThunk("global/getById", async (_, ThunkApi) => {
    try {
        return (await Api.get("/global/69dd8d3ce976636fa1402043")).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const UpdateGlobalSetting = createAsyncThunk("global/update", async (data: Partial<GlobalSetting>, ThunkApi) => {
    try {
        return (await Api.put("/global/69dd8d3ce976636fa1402043", data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})




export default globalSlice.reducer