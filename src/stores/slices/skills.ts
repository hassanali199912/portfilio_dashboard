
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import Api from "../../config/api.config"


export type SkillsRow = {
    _id: string;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;

    name: string,
    image: string,
    value: number,
    order: number,
};


interface initialSlicePops {
    loading: boolean,
    data: SkillsRow[] | null,
    error: any | null
}

const initialSlice: initialSlicePops = {
    loading: false,
    data: null,
    error: null
}

const SkillsSlice = createSlice({
    name: "skills/slice",
    initialState: initialSlice,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(GetAllSkills.pending, (state) => {
            //  const toast = useToastActions();
            state.loading = true
        }).addCase(GetAllSkills.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data as SkillsRow[];
            state.error = null;
        }).addCase(GetAllSkills.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.error;
        }).addCase(ChangeVisiablillity.fulfilled, (state, action) => {
            if (!state.data) return;
            const updatedSkills = action.payload.data;
            const target = state.data.find(skills => skills._id === updatedSkills._id);
            if (target) target.isVisible = updatedSkills.isVisible;
        }).addCase(CreateSkills.fulfilled, (state, action) => {
            if (!state.data) return;
            if (action.payload.success) {
                state.data.unshift(action.payload.data);
            }
        }).addCase(DeleteSkills.fulfilled, (state, action) => {
            if (!state.data) return;
            if (action.payload.success) {
                state.data = state.data.filter(item => item._id !== action.meta.arg);
            }
        }).addCase(UpdateSkills.fulfilled, (state, action) => {
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


export const GetAllSkills = createAsyncThunk("skills/getAll", async (_, ThunkApi) => {
    try {
        return (await Api.get("/skills")).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const ChangeVisiablillity = createAsyncThunk("skills/change-visible", async (id: string, ThunkApi) => {
    try {
        return (await Api.get(`/skills/visible/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const CreateSkills = createAsyncThunk("skills/create", async (data: Partial<SkillsRow>, ThunkApi) => {
    try {
        return (await Api.post(`/skills/`, data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})
export const UpdateSkills = createAsyncThunk("skills/update", async (updatedData: { data: Partial<SkillsRow>, id: string }, ThunkApi) => {
    try {
        return (await Api.put(`/skills/${updatedData.id}`, updatedData.data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const DeleteSkills = createAsyncThunk("skills/delete", async (id: string, ThunkApi) => {
    try {
        return (await Api.delete(`/skills/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})


export default SkillsSlice.reducer