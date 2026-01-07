
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import Api from "../../config/api.config"


export type SectionRow = {
    key: string;
    title: string;
    _id: string;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
};


interface initialSlicePops {
    loading: boolean,
    data: SectionRow[] | null,
    error: any | null
}

const initialSlice: initialSlicePops = {
    loading: false,
    data: null,
    error: null
}

const SectionSlice = createSlice({
    name: "section/slice",
    initialState: initialSlice,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(GetAllSections.pending, (state) => {
            //  const toast = useToastActions();
            state.loading = true
        }).addCase(GetAllSections.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data as SectionRow[];
            state.error = null;
        }).addCase(GetAllSections.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.error;
        }).addCase(ChangeVisiablillity.fulfilled, (state, action) => {
            if (!state.data) return;
            const updatedSection = action.payload.data;
            const target = state.data.find(section => section._id === updatedSection._id);
            if (target) target.isVisible = updatedSection.isVisible;
        }).addCase(CreateSection.fulfilled, (state, action) => {
            if (!state.data) return;
            if (action.payload.success) {
                state.data.unshift(action.payload.data);
            }
        }).addCase(DeleteSection.fulfilled, (state, action) => {
            if (!state.data) return;
            if (action.payload.success) {
                state.data = state.data.filter(item => item._id !== action.meta.arg);
            }
        })

    }
})


export const GetAllSections = createAsyncThunk("sections/getAll", async (_, ThunkApi) => {
    try {
        return (await Api.get("/sections")).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const ChangeVisiablillity = createAsyncThunk("sections/change-visible", async (id: string, ThunkApi) => {
    try {
        return (await Api.get(`/sections/visible/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const CreateSection = createAsyncThunk("sections/create", async (data: Partial<SectionRow>, ThunkApi) => {
    try {
        return (await Api.post(`/sections/`, data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const DeleteSection = createAsyncThunk("sections/delete", async (id: string, ThunkApi) => {
    try {
        return (await Api.delete(`/sections/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})


export default SectionSlice.reducer