import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from './agent';

export const fetchRealTimeWeather = createAsyncThunk<any, string>('fetchRealTimeWeather',async (ip, thunkAPI) => {
    try {
        return await agent.LocationDetails.RealTimeweatherDetails(ip)
    } catch (error: any) {
        return error
    }
})

export const fetchSearchAutoComplete = createAsyncThunk<any, string>('fetchSearchAutoComplete',async (text, thunkAPI) => {
    try {
        return await agent.LocationDetails.SearchAutoComplete(text)
    } catch (error: any) {
        return error
    }
})

export const fetchIPDetails = createAsyncThunk('fetchIPDetails',async () => {
    try {
        return await agent.IPDetails.ipNumber()
    } catch (error: any) {
        return error
    }
})

const WeatherDetailsSlice = createSlice({
    name: 'WeatherDetails',
    initialState: {
        isIPLoading:false,
        isRealTWLoading:false,
        isSearchLoading:false,
        data: {
            realTimedata:{},
            ipdata:{},
            searchdata:{}
        },
        isIPError:false,
        isRealTWError:false,
        isSearchError:false
    },
    reducers: {}, 
    extraReducers: (builder) => {
        
        // realtimedata..........................................
        builder.addCase(fetchRealTimeWeather.pending, (state) => {
            state.isRealTWLoading = true;
        });
        builder.addCase(fetchRealTimeWeather.fulfilled, (state, action) => {
            state.isRealTWLoading = false;
            state.data.realTimedata = action.payload
        });
        builder.addCase(fetchRealTimeWeather.rejected, (state, action) => {
            state.isRealTWLoading = false;
            state.isRealTWError = true
        });

        // Ipdata..............................................
        builder.addCase(fetchIPDetails.pending, (state) => {
            state.isIPLoading = true;
        });
        builder.addCase(fetchIPDetails.fulfilled, (state, action) => {
            state.isIPLoading = false;
            state.data.ipdata = action.payload
        });
        builder.addCase(fetchIPDetails.rejected, (state, action) => {
            state.isIPLoading = false;
            state.isIPError = true
        })

        // search-auto-complete.................................
         // Ipdata..............................................
        
        builder.addCase(fetchSearchAutoComplete.pending, (state) => {
            state.isSearchLoading = true;
        });
        builder.addCase(fetchSearchAutoComplete.fulfilled, (state, action) => {
            state.isSearchLoading = false;
            state.data.searchdata = action.payload
        });
        builder.addCase(fetchSearchAutoComplete.rejected, (state, action) => {
            state.isSearchLoading = false;
            state.isSearchError = true
        })
    },
});



export default WeatherDetailsSlice.reducer
