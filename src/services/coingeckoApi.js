import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const coingeckoApi = {
  getMarketData: async (tokenIds, sparkline = true) => {
    try {
      const response = await api.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: tokenIds.join(","),
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: sparkline,
          price_change_percentage: "24h",
        },
      });

      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  searchTokens: async (query) => {
    try {
      const response = await api.get("search", {
        params: { query },
      });

      return response.data.coins.slice(0, 20);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  getTrendingTokens: async () => {
    try {
      const response = await api.get("/search/trending");
      console.log("response => ", response.data.coins);

      return response.data.coins.map((item) => ({
        id: item.item.id,
        name: item.item.name,
        symbol: item.item.symbol,
        thumb: item.item.thumb,
        market_cap_rank: item.item.market_cap_rank,
      }));
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  getCoinsList: async () => {
    try {
      const response = await api.get("/coins/list");
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  getTokenDetails: async (tokenId) => {
    try {
      const response = await api.get(`/coins/${tokenId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: true,
        },
      });

      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },
  // get data for sparklines
  getMarketChar: async (tokenId , days = 7) => {

  }
};

coingeckoApi.searchTokens("solana").then((data) => console.log(data));
