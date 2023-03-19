import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filterApi } from "../Helpers/filterApi";
import axios from "axios";

export const fetchCourses = createAsyncThunk(
  "course/getCourses",
  async ({token}: any, {thunkAPI, rejectWithValue }:any) => {
    const url = "https://api.wisey.app/api/v1/core/preview-courses";
    if (token) {
      
      try {
        let response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        });

        return filterApi(response.data.courses);
      } catch (error: any) {
        return rejectWithValue(error.message as string);
      }
    }
  }
);
export const fetchCourse = createAsyncThunk(
  "course/getCourse",
  async ({token,selectedId}: any, { rejectWithValue }) => {
   console.log(token,selectedId);
    const url = `https://api.wisey.app/api/v1/core/preview-courses/${selectedId}`;
    if (token ) {
      console.log(url);
      try {
        let response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        });
        
        const data = await response.data;
        console.log(data);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message as string);
      }
    }
  }
);

export const getToken = createAsyncThunk(
  "course/getToken",
  async (_, { rejectWithValue }) => {
    const url =
      "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions";

    try {
      let response = await axios.get(url);
      let data = await response.data;

      return data.token;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

type AppState = {
  loading: boolean;
  error: string | unknown,
  coursesData: Array<any>,
  token: string,
  courseData: any
  selectedId: string,
  currentVideo: string,
  isPictureInPicture: boolean,
  ended: any[]
};

const initialState: AppState = {
  loading: false,
  error: "",
  coursesData: [],
  token: "",
  courseData: {},
  selectedId: '',
  currentVideo: "",
  isPictureInPicture: false,
  ended: []
};

const coursesSlice = createSlice({
  name: "wisey",
  initialState,
  reducers: {
    selectId: (state, action) => {
      state.selectedId = action.payload;
    },
    setCurrentVideo: (state, action) => { 
      state.currentVideo = action.payload;
      
    },
    setPictureInPicture: (state, action) => {
      state.isPictureInPicture = action.payload;
    },
    setWatchedToEnd(state, action) {
      state.ended = action.payload;
    }
    
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCourses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.coursesData = action.payload;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCourse.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.courseData = action.payload;
    });
    builder.addCase(fetchCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {selectId,setCurrentVideo,setPictureInPicture,setWatchedToEnd} = coursesSlice.actions;

export default coursesSlice.reducer;
