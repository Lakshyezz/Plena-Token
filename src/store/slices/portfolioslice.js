import { coingeckoApi } from "@/services/coingeckoApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWatchListPrices = createAsyncThunk(
  "portfolio/fetchWatchlistPrices",
  async (tokenIds, { rejectWithValue }) => {
    try {
      if (!tokenIds || tokenIds.length === 0) {
        const data = await coingeckoApi.getMarketData(tokenIds);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchTokens = createAsyncThunk(
  "portfolio/searchTokens",
  async (query, { rejectWithValue }) => {
    try {
      if (!query) return [];
      const data = await coingeckoApi.searchTokens(query);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrendingTokens = createAsyncThunk(
  "portfolio/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      const data = await coingeckoApi.getTrendingTokens();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
    
}