import { createSlice, createAsyncThunk , createAction} from "@reduxjs/toolkit";
const backend = import.meta.env.VITE_RENDER_URL; 

// Thunks
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({page = 1}, thunkapi) => {
    const state = thunkapi.getState();
    const token = state?.auth?.token;

    const res = await fetch(`${backend}posts?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (formData, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth?.token;
    const user = state.auth?.user;
    if (!formData) {
      throw new Error("no post data is provided");
    }
    formData.append("author", user.name);
    formData.append("createdBy", user._id);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    const res = await fetch(`${backend}posts`, {
      method: "POST",
      headers: {

        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const errorData = await res.json();
      return thunkApi.rejectWithValue(errorData);
    }
    const data = await res.json();
    return data;
  }
);
export const resetPostStatus = createAction("posts/resetStatus");

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, formData }, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth?.token;

    const res = await fetch(`${backend}posts/${id}`, {
      method: "PUT",
      headers: {

        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id, thunkApi) => {
  const state = thunkApi.getState(); 
  const token = state.auth?.token; 
  const res = await fetch(`${backend}posts/${id}`, {
    method: "DELETE",
    headers:{
      Authorization: `Bearer ${token}`
    }
  });

  return res;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    status: "idle",
    currentPost: null,
    hasMore: true,
  },
  reducers: {
    setCurrentPost(state, action) {
      const id = action.payload;
      state.currentPost = state.list.find((post) => post.id === id) || null;
    },
    clearCurrentPost(state) {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        if(action.meta.arg.page === 1){
          state.list = action.payload.posts;
        }else{
          state.list = [...state.list, ...action.payload.posts]
        }
        state.hasMore = action.payload.posts.length > 0; 
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      })

      // addPost
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.list.push(action.payload);
      })
      .addCase(addPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
      })  .addCase(resetPostStatus, (state) => {
      state.status = "idle";
    })

      // editPost
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";

        const index = state.list.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(editPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = "failed";
      })

      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter((post) => post._id !== action.payload);
      });
  },
});

export const { setCurrentPost, clearCurrentPost } = postSlice.actions;
export default postSlice.reducer;
