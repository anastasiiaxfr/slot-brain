import qs from 'qs'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchGames, shortPopulateParams } from './api'
import Layout from "@/components/Layout"
import Hero from "@/components/Sections/Hero"
import Seo from "@/components/SEO"
import HeroImg from "@/assets/img/hero/slide1.jpg"
import Card from "@/components/Sections/Games/Card"
import Select from 'react-select'

import styles from "./styles.module.sass"

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

const hero = {
    title: "Games",
    descritption: "Description",
    img: HeroImg
}

const filter_by_provider = [
    { value: 'provider1', label: 'Provider1' },
    { value: 'provider2', label: 'Provider2' },
    { value: 'provider3', label: 'Provider3' },
    { value: 'provider4', label: 'Provider4' },
    { value: 'provider5', label: 'Provider5' },
]

const filter_by_type = [
    { value: 'type1', label: 'type1' },
    { value: 'type2', label: 'type2' },
    { value: 'type3', label: 'type3' },
    { value: 'type4', label: 'type4' },
    { value: 'type5', label: 'type5' },
]

const order = [
    { value: 'asc', label: 'ASC' },
    { value: 'desc', label: 'DESC' },
]

const GamesParentPage = ({ games }: any) => {
    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <Hero data={hero} />
                <section className="container">
                    <div className={styles.cards_action}>
                        <div>
                            Order By:
                            <Select options={order} />

                        </div>
                        <div>
                            Provider:
                            <Select options={filter_by_provider} />

                        </div>
                        <div>
                            Type:
                            <Select options={filter_by_type} />
                        </div>
                    </div>
                </section>
                <article className={`container page ${styles.cards_wrap}`}>
                    <div className={styles.cards}>
                        {games.data.map((i: any, ind: number) => (
                            <Card data={i.attributes} key={ind} />
                        ))}
                    </div>
                </article>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const queryClient = new QueryClient()

    const pgQuery = qs.stringify(
        {
            ...shortPopulateParams,
            pagination: {
                page: 1,
                pageSize: 5,
            },
        },
        {
            encodeValuesOnly: true,
        },
    )
    const games: any = await fetchGames({ queryKey: ['games', pgQuery] })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            games,
        },
        revalidate: 60 * 1,
    }
}

export default GamesParentPage
