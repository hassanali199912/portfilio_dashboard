import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Api from "../../config/api.config";

export type MessageRow = {
    _id: string;
    name: string;
    whatsapp: string;
    budget: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
};

interface MessagesState {
    loading: boolean;
    data: MessageRow[] | null;
    error: string | null;
}

const initialSlice: MessagesState = {
    loading: false,
    data: null,
    error: null,
};

const MessagesSlice = createSlice({
    name: "messages/slice",
    initialState: initialSlice,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data as MessageRow[];
                state.error = null;
            })
            .addCase(GetAllMessages.rejected, (state) => {
                state.loading = false;
                state.data = null;
                state.error = "Could not load messages.";
            })
            .addCase(UpdateMessage.fulfilled, (state, action) => {
                if (!state.data || !action.payload.success) return;
                const updatedValue = action.payload.data as MessageRow;
                state.data = state.data.map((item) =>
                    item._id === updatedValue._id ? updatedValue : item
                );
            })
            .addCase(DeleteMessage.fulfilled, (state, action) => {
                if (!state.data || !action.payload.success) return;
                state.data = state.data.filter((item) => item._id !== action.meta.arg);
            });
    },
});

export const GetAllMessages = createAsyncThunk("messages/getAll", async (_, thunkApi) => {
    try {
        return (await Api.get("/message")).data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const UpdateMessage = createAsyncThunk(
    "messages/update",
    async (updatedData: { data: Partial<MessageRow>; id: string }, thunkApi) => {
        try {
            return (await Api.put(`/message/${updatedData.id}`, updatedData.data)).data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const DeleteMessage = createAsyncThunk("messages/delete", async (id: string, thunkApi) => {
    try {
        return (await Api.delete(`/message/${id}`)).data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export default MessagesSlice.reducer;
