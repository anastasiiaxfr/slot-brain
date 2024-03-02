import qs from 'qs'
import { useQuery } from '@tanstack/react-query'



export const defaultBlogsParams = {
    populate: 'deep',
}

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
    console.log('queryKey:', queryKey); // Add this line for debugging

    let queryParams = queryKey && queryKey[1] ? queryKey[1] : '';

    if (pageParam) {
        const p = qs.stringify(
            { pagination: { page: pageParam, pageSize: 2 } },
            { encodeValuesOnly: true },
        )
        queryParams += '&' + p
    }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
    )
    const parsed = await res.json()
    return parsed
}

export async function fetchBlog(params?: any) {
    const query = qs.stringify(params)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?${query}`)
    const json = await res.json()
    return json.data
}


export async function fetchLatestPosts() {
    const postsQuery = qs.stringify(
        {
            ...shortBlogsPopulateParams,
            meta: {
                pagination: {
                    page: 1,
                    pageSize: 25,
                },
            },
        },
        {
            encodeValuesOnly: true,
        },
    )
    return fetchBlogs({ queryKey: ['blogs', postsQuery] })
}


// 
