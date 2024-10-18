export const useTrendingInfo = () => {
    const { data: trendingInfo } = useFetch('https://api.coingecko.com/api/v3/search/trending')

    return { trendingInfo }
}