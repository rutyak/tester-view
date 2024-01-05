import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type initial ={
    formInfo: any
}

const initialState : initial ={
    formInfo: []
}

const fSurvey = createSlice({
    name: 'formSurvey',
    initialState,
    reducers: {
        formSurvey: (state: any, action: PayloadAction<any>)=>{
            state.formInfo.push(action.payload)
        } 
    }
})

export const {formSurvey} = fSurvey.actions;
export default fSurvey.reducer;
