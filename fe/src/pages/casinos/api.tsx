import qs from 'qs'

export const defaultParams = {
    populate: 'deep',
}

export const shortPopulateParams = {
    populate: {
        cover: {
            populate: 'deep',
        },
        seo: {
            populate: 'deep',
        },
    },
}

export async function fetchCasinos(params?: any) {
    const { queryKey, pageParam } = params
    //console.log('queryKey:', queryKey); // Add this line for debugging

    let queryParams = queryKey && queryKey[1] ? queryKey[1] : '';

    if (pageParam) {
        const p = qs.stringify(
            { pagination: { page: pageParam, pageSize: 2 } },
            { encodeValuesOnly: true },
        )
        queryParams += '&' + p
    }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/casinos?populate=*`,
    )
    const parsed = await res.json()
    return parsed
}

export async function fetchCasino(params?: any) {
    const query = qs.stringify(params)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casinos?${query}`)
    const json = await res.json()
    return json.data
}




