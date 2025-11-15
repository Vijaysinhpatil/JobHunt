import { createSlice } from "@reduxjs/toolkit";

const applicationslice = createSlice({

    name : 'application',

    initialState : {
        applicants : [],
    },

    reducers : {
        setAllApplicants : (state , action) => {

            state.applicants = action.payload;
        }
    }
})

export const { setAllApplicants } = applicationslice.actions;
export default applicationslice.reducer;