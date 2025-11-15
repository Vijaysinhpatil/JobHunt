import Companies from "@/admin/Companies";
import { createSlice } from "@reduxjs/toolkit";
import { steps } from "motion";

const companyslice = createSlice({

    name : 'company',
    initialState : {
        singleCompany : null,
        companies : [],
        serchCompanyByText : ""
    } ,
    reducers : {
        setSingleCompany : (state , action ) => {
            state.singleCompany = action.payload
        },
        setCompanies : (state , action) => {
            state.companies = action.payload
        },
        setSearchCompanyByText : (state , action) => {
            state.serchCompanyByText = action.payload
        }
    }
});

export const { setSingleCompany , setCompanies , setSearchCompanyByText } = companyslice.actions;
export default companyslice.reducer;