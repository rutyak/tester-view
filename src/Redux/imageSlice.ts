import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type initial ={
    imageInfo: any
}

const initialState : initial ={
    imageInfo: []
}

const iSurvey = createSlice({
    name: 'imageSurvey',
    initialState,
    reducers: {
        imageSurvey: (state: any, action: PayloadAction<any>)=>{
            state.imageInfo.push(action.payload)
        } 
    }
})

export const {imageSurvey} = iSurvey.actions;
export default iSurvey.reducer;
