import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "c",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery  : ""
  },
  reducers: {
    // actions

    setAllJobs: (state, actions) => {
      state.allJobs = actions.payload;
    },
    setSingleJob: (state, actions) => {
      state.singleJob = actions.payload;
    },
    setAllAdminJobs: (state, actions) => {
      state.allAdminJobs = actions.payload;
    },
    setSearchJobByText: (state, actions) => {
      state.searchJobByText = actions.payload;
    },
    setAllAppliedJobs: (state, actions) => {
      state.allAppliedJobs = actions.payload;
    },
    setSearchedQuery : (state , actions) => {
      state.searchedQuery  = actions.payload
    }
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery
} = JobSlice.actions;
export default JobSlice.reducer;
