export const useMarketList = () => {
    const { data: marketLists, error } = useFetch('https://api.coingecko.com/api/v3/coins/markets',
        {
            params: {
                vs_currency: 'usd',
                per_page: 100,
                page: 1,
                sparkline: true,
            }
        }
    );

    return { marketLists, error };
}