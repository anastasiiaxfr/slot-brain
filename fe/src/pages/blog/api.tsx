import qs from 'qs'
import { useQuery } from '@tanstack/react-query'

export const shortBlogsPopulateParams = {
    populate: {
        cover: {
            populate: 'deep',
        },
        seo: {
            populate: 'deep',
        },
    },
}

export async function fetchBlogs(params?: any) {
    const { queryKey, pageParam } = params
    let queryParams = queryKey[1]
    if (pageParam) {
        const p = qs.stringify(
            { pagination: { page: pageParam, pageSize: 25 } },
            { encodeValuesOnly: true },
        )
        queryParams += '&' + p
    }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs?${queryParams}`,
    )
    const parsed = await res.json()
    return parsed
}