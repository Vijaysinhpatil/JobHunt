import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({

    name : "job",
    initialState : {
         
        allJobs : [],
        singleJob : null

    },
    reducers : {
        // actions

        setAllJobs : (state , actions) => {
            state.allJobs = actions.payload
        },
        setSingleJob : (state , actions) => {
            state.singleJob = actions.payload
        }
    }
})

export const { setAllJobs , setSingleJob } = JobSlice.actions
export default JobSlice.reducer;