
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import Api from "../../config/api.config"


export type ExperienceRow = {
    _id: string;
    isVisible: boolean;
    order: number,
    createdAt: string;
    updatedAt: string;
    type: "work" | "education" | "training",
    date: string,
    title: {
        ar: string,
        en: string
    },
    shortDescription: {
        ar: string,
        en: string
    },
};


interface initialSlicePops {
    loading: boolean,
    data: ExperienceRow[] | null,
    error: any | null
}

const initialSlice: initialSlicePops = {
    loading: false,
    data: null,
    error: null
}

const ExperienceSlice = createSlice({
    name: "experience/slice",
    initialState: initialSlice,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(GetAllExperience.pending, (state) => {
            state.loading = true
        }).addCase(GetAllExperience.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data as ExperienceRow[];
            state.error = null;
        })
            .addCase(GetAllExperience.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error;
            }).addCase(ChangeVisiablillity.fulfilled, (state, action) => {
                if (!state.data) return;
                const updatedItem = action.payload.data;
                const target = state.data.find(skills => skills._id === updatedItem._id);
                if (target) target.isVisible = updatedItem.isVisible;
            }).addCase(CreateExperience.fulfilled, (state, action) => {
                if (!state.data) return;
                if (action.payload.success) {
                    state.data.unshift(action.payload.data);
                }
            }).addCase(DeleteExperience.fulfilled, (state, action) => {
                if (!state.data) return;
                if (action.payload.success) {
                    state.data = state.data.filter(item => item._id !== action.meta.arg);
                }
            }).addCase(UpdateExperience.fulfilled, (state, action) => {
                if (!state.data) return;
                const updatedValue = action.payload.data;
                state.data = state.data.map(item =>
                    item._id === updatedValue._id
                        ? updatedValue
                        : item
                );
            })

    }
})


export const GetAllExperience = createAsyncThunk("experience/getAll", async (_, ThunkApi) => {
    try {
        return (await Api.get("/experience")).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const ChangeVisiablillity = createAsyncThunk("experience/change-visible", async (id: string, ThunkApi) => {
    try {
        return (await Api.get(`/experience/visible/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const CreateExperience = createAsyncThunk("experience/create", async (data: Partial<ExperienceRow>, ThunkApi) => {
    try {
        return (await Api.post(`/experience/`, data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})
export const UpdateExperience = createAsyncThunk("experience/update", async (updatedData: { data: Partial<ExperienceRow>, id: string }, ThunkApi) => {
    try {
        return (await Api.put(`/experience/${updatedData.id}`, updatedData.data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const DeleteExperience = createAsyncThunk("experience/delete", async (id: string, ThunkApi) => {
    try {
        return (await Api.delete(`/experience/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})


export default ExperienceSlice.reducer