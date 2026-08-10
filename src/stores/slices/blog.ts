import api from '../../config/api.config';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface BlogItem {
  _id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  tags: string[];
  readingTime: number;
  coverImage: string;
  slug: string;
  isFeatured: boolean;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogState {
  data: BlogItem[];
  selected: BlogItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getBlogById: (state, action: PayloadAction<string>) => {
      state.selected = state.data.find((item) => item._id === action.payload) || null;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = null;
        state.selected = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data as BlogItem[];
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?.toString() || 'Some Error Happen';
      })
      .addCase(getBlogByIdApi.fulfilled, (state, action) => {
        state.selected = action.payload.data as BlogItem;
      })
      .addCase(UpdateBlog.fulfilled, (state, action) => {
        if (!state.data) return;
        const updatedValue = action.payload.data as BlogItem;
        state.selected = updatedValue;
        state.data = state.data.map((item) =>
          item._id === updatedValue._id ? updatedValue : item
        );
      })
      .addCase(DeleteBlog.fulfilled, (state, action) => {
        if (!state.data) return;
        if (action.payload.success) {
          state.data = state.data.filter((item) => item._id !== action.meta.arg);
        }
      })
      .addCase(CreateBlog.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.data.unshift(action.payload.data);
        }
      })
      .addCase(ChangeBlogVisibility.fulfilled, (state, action) => {
        if (!state.data) return;
        const updatedItem = action.payload.data as BlogItem;
        const target = state.data.find((item) => item._id === updatedItem._id);
        if (target) target.isVisible = updatedItem.isVisible;
        if (state.selected?._id === updatedItem._id) {
          state.selected.isVisible = updatedItem.isVisible;
        }
      });
  },
});

export const getAllBlogs = createAsyncThunk('blog/getall', async (_, thunkApi) => {
  try {
    return (await api.get('/blog')).data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getBlogByIdApi = createAsyncThunk('blog/getById', async (blogId: string, thunkApi) => {
  try {
    return (await api.get(`/blog/${blogId}`)).data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const CreateBlog = createAsyncThunk(
  'blog/create',
  async (data: Partial<BlogItem>, thunkApi) => {
    try {
      return (await api.post('/blog', data)).data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const UpdateBlog = createAsyncThunk(
  'blog/update',
  async (updatedData: { data: Partial<BlogItem>; id: string }, thunkApi) => {
    try {
      return (await api.put(`/blog/${updatedData.id}`, updatedData.data)).data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const DeleteBlog = createAsyncThunk('blog/delete', async (id: string, thunkApi) => {
  try {
    return (await api.delete(`/blog/${id}`)).data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ChangeBlogVisibility = createAsyncThunk(
  'blog/change-visible',
  async (id: string, thunkApi) => {
    try {
      return (await api.get(`/blog/visible/${id}`)).data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const { clearSelected, getBlogById } = blogSlice.actions;

export default blogSlice.reducer;
