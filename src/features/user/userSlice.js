import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAddress, getPosition } from "../../services/apiGeocoding";


const initialState = {
  username: '',
  isSignedIn: false,
  status: 'idle',
  position: {},
  address: '',
  error: '',
  ordersId: []
}


export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    //get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    }

    //convert position to address by an API
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // Payload of the FULFILLED state
    return { position, address };
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload
      state.isSignedIn = true
    },
    logout(state, action) {
      state.username = ''
      state.isSignedIn = false
    },
    saveOrdersID(state, action) {
      state.ordersId.push(action.payload)
    }
  },
  extraReducers: (builder) => builder
    .addCase(fetchAddress.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchAddress.fulfilled, (state, action) => {
      state.position = action.payload.position;
      state.address = action.payload.address;
      state.status = 'idle';
    })
    .addCase(fetchAddress.rejected, (state, action) => {
      state.status = 'error';
      state.error = 'There was a problem getting your address.Please write it yourself'
    })
})

export const { updateName, logout, saveOrdersID } = userSlice.actions
export default userSlice.reducer