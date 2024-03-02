import qs from 'qs'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchBonuses, shortBonusesPopulateParams } from './api'

import Link from "next/link"
import Layout from "@/components/Layout"
import Seo from "@/components/SEO"

const seo = {
    metaTitle: 'Lorem Ipsum',
    metaHeading: 'Lorem Ipsum',
    metaDescription:
        'Lorem Ipsum',
    metaImg: `${process.env.NEXT_PUBLIC_HOST}/ua/og_600x300.jpg`,
    metaURL: `${process.env.NEXT_PUBLIC_HOST}/ua/blog/`,
}

const og = [
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: '' },
    { property: 'og:description', content: '' },
    {
        property: 'og:site_name',
        content: '',
    },
    { property: 'og:url', content: '' },
    { property: 'og:image', content: '' },
    { property: 'og:image:width', content: '600' },
    { property: 'og:image:height', content: '300' },
    { property: 'og:locale', content: 'uk' },
    { property: 'og:section', content: 'Blog' },
    { property: 'og:published_time', content: '2020-07-21T08:17:33+01:00' },
]

const BonusesParentPage = ({ bonuses }: any) => {
    console.log(bonuses)
    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <article className="container page">
                    <h1>Bonuses</h1>

                    <ul>
                        {bonuses.data.map((i: any, ind: number) => (
                            <li key={ind}><Link href={`/bonuses/${i.attributes.slug}`}>
                                {i.attributes.title}
                            </Link></li>
                        ))}
                    </ul>
                </article>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const queryClient = new QueryClient()

    const pgQuery = qs.stringify(
        {
            ...shortBonusesPopulateParams,
            pagination: {
                page: 1,
                pageSize: 5,
            },
        },
        {
            encodeValuesOnly: true,
        },
    )
    const bonuses: any = await fetchBonuses({ queryKey: ['bonuses', pgQuery] })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            bonuses,
        },
        revalidate: 60 * 1,
    }
}


export default BonusesParentPage
