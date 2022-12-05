/* 
    Redux slice to hold Config state for the grid, such as
    - active cell color
    - grid size
*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gridRows: 20,
    gridCols: 20,
    cellActiveColor: "blue",
    cellInactiveColor: "white"
}

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        'changeGridSize': (state, action) => {

        },

        'changeCellColor': (state, action) => {

        }
    }
})

// export actions
export const {
    changeGridSize,
    changeCellColor
} = configSlice.actions

// export reducer
export default configSlice.reducer