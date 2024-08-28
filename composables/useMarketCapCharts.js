export const useMarketCapChart = (id = 'bitcoin', days = 7) => {
    const { data, error } = useFetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
            params: {
                vs_currency: "usd",  // Devise de comparaison
                days: days,          // Période (en jours)
                interval: "daily",   // Intervalle de temps entre les points de données
            },
        }
    );

    return { data, error };
};
