import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../config/api.config";

/* =======================
   Types
======================= */

export type LangText = {
  ar: string;
  en: string;
};

export type SectionContent = {
  title: LangText;
  description: LangText;
};

export type ProfileContent = {
  _id: string;
  createdAt: string;
  updatedAt: string;

  hero: SectionContent;
  about: SectionContent;
  work_process: SectionContent;
  portfolio: SectionContent;
  what_i_do: SectionContent;
};

interface InitialSliceProps {
  loading: boolean;
  data: ProfileContent | null;
  error: any | null;
}

/* =======================
   Initial State
======================= */

const initialState: InitialSliceProps = {
  loading: false,
  data: null,
  error: null,
};

/* =======================
   Async Thunks
======================= */

export const GetProfileContentById = createAsyncThunk(
  "profileContent/getById",
  async (_, thunkApi) => {
    try {
      return (
        await Api.get("/profile-content/695598ca74f0fa8336a3722a")
      ).data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const UpdateProfileContent = createAsyncThunk(
  "profileContent/update",
  async (data: Partial<ProfileContent>, thunkApi) => {
    try {
      return (
        await Api.put(
          "/profile-content/695598ca74f0fa8336a3722a",
          data
        )
      ).data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

/* =======================
   Slice
======================= */

const profileContentSlice = createSlice({
  name: "profileContent/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* GET */
      .addCase(GetProfileContentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProfileContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data as ProfileContent;
        state.error = null;
      })
      .addCase(GetProfileContentById.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload || action.error;
      })

      /* UPDATE */
      .addCase(UpdateProfileContent.fulfilled, (state, action) => {
        state.data = action.payload.data as ProfileContent;
      });
  },
});

export default profileContentSlice.reducer;
