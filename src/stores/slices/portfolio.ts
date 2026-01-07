import api from "../../config/api.config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface LocalizedText {
    ar: string;
    en: string;
}

export type ProjectType = "government" | "commercial" | "personal";

export interface PortfolioItem {
    _id: string;

    title: LocalizedText;
    shortDescription: LocalizedText;
    role: LocalizedText;

    image: string;
    techStack: string[];

    projectType: ProjectType;

    liveUrl: string;
    githubUrl: string;

    isFeatured: boolean;
    isVisible: boolean;
    order: number;

    createdAt: string;
    updatedAt: string;
}

export interface PortfolioState {
    data: PortfolioItem[];
    selected: PortfolioItem | null;
    loading: boolean;
    error: string | null;
}

const initialState: PortfolioState = {
    data: [],
    selected: null,
    error: null,
    loading: false
}




const portfolioSlice = createSlice({
    name: "portfolio",
    initialState: initialState,
    reducers: {
        getPortfolioById: (state, action: PayloadAction<string>) => {
            state.selected = state.data.find(item => item._id === action.payload) || null
        },
        clearSelected: (state) => {
            state.selected = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPortfolios.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = null;
            state.selected = null
        }).addCase(getAllPortfolios.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data as PortfolioItem[];
        }).addCase(getAllPortfolios.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message?.toString() || "Some Error Happen";
        }).addCase(getPortfolioByIdApi.fulfilled, (state, action) => {
            state.selected = action.payload.data as PortfolioItem
        }).addCase(UpdatePortfolio.fulfilled, (state, action) => {
            if (!state.data) return;
            const updatedValue = action.payload.data;
            state.selected = updatedValue
            let target = state.data.find(item => item._id === updatedValue._id);
            if (target) {
                target = updatedValue
            };
        }).addCase(DeletePortfolio.fulfilled, (state, action) => {
            if (!state.data) return;
            if (action.payload.success) {
                state.data = state.data.filter(item => item._id !== action.meta.arg
                )
            }
        }).addCase(CreatePortfolio.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.data.unshift(action.payload.data);
            }
        })

    }
})


// Extra Reducers


export const getAllPortfolios = createAsyncThunk("portfolio/getall", async (_, thunkApi) => {
    try {
        return (await api.get("/portfolio")).data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const getPortfolioByIdApi = createAsyncThunk("portfolio/getById", async (prortfolioId: string, thunkApi) => {
    try {
        return (await api.get(`/portfolio/${prortfolioId}`)).data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const UpdatePortfolio = createAsyncThunk("portfolio/update", async (updatedData: { data: Partial<PortfolioItem>, id: string }, ThunkApi) => {
    try {
        return (await api.put(`/portfolio/${updatedData.id}`, updatedData.data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const DeletePortfolio = createAsyncThunk("portfolio/delete", async (id: string, ThunkApi) => {
    try {
        return (await api.delete(`/portfolio/${id}`)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const CreatePortfolio = createAsyncThunk("portfolio/create", async (data: Partial<PortfolioItem>, ThunkApi) => {
    try {
        return (await api.post(`/portfolio`, data)).data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})




export const { clearSelected, getPortfolioById } = portfolioSlice.actions

export default portfolioSlice.reducer