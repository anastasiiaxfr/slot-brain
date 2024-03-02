import Layout from "@/components/Layout"
import Seo from "@/components/SEO"
import { marked } from 'marked'
import Image from "next/image"
import Link from "next/link"

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

export default function CasinosSinglePage({ casino }: any) {
    console.log(casino.attributes);
    const data = casino.attributes;
    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <article className="container page">
                    <h1>{data.title}</h1>

                    <div className={styles.casino_info}>
                        {data.thumbnail.data?.attributes?.url ? <div className={styles.casino_logo}>
                            <Image src={data.thumbnail.data.attributes.url} alt={data.title} height={150} width={300} />
                        </div> : null}
                        <table className="table">

                            <tr>
                                <th> Name: </th>
                                <td> {data.title} </td>
                            </tr>
                            <tr>
                                <th> Profit: </th>
                                <td> {data.profit} </td>
                            </tr>
                            <tr>
                                <th> Rating: </th>
                                <td> {data.rating} </td>
                            </tr>
                            <tr>
                                <th> Type: </th>
                                <td> {data.casino_type.data.attributes.name} </td>
                            </tr>
                            {data.casino_providers ? <tr>
                                <th> Providers: </th>
                                <td> {data.casino_providers.data.map((i: any, ind: number) => (<span key={ind}>{i.attributes.name}</span>))} </td>
                            </tr> : null}
                            <tr>
                                <th>Licences: </th>
                                <td>{data.licence.data.attributes.name}</td>
                            </tr>
                            {data.payment_methods ? <tr>
                                <th>Paymenth Methods:</th>
                                <td>{data.payment_methods.data.map((i: any, ind: number) => (<span key={ind}>{i.attributes.name}</span>))}</td>
                            </tr> : null}
                            {data.languages.data.length > 0 ? <tr>
                                <th>Languages: </th>
                                <td>{data.languages.data.map((i: any, ind: number) => (<span key={ind}>{i.attributes.name}</span>))}</td>
                            </tr> : null}
                            {data.countries.data.length > 0 ? <tr>
                                <th>GEO:</th>
                                <td>{data.countries.data.map((i: any, ind: number) => (
                                    <span key={ind}>{i.attributes.code}</span>
                                ))}</td>
                            </tr> : null}
                            {data.currencies.data.length > 0 ? <tr>
                                <th>Currencies:</th>
                                <td>{data.currencies.data.map((i: any, ind: number) => (<span key="ind">{i.attributes.code}</span>))}</td>
                            </tr> : null}
                            {data.bonuse_type ? <tr>
                                <th>Bonuses: </th>
                                <td>{data.bonuse_type.data.attributes.name}</td>
                            </tr> : null}
                            {data.game_types.length > 0 ? <tr>
                                <th>Games: </th>
                                <td>{data.game_types.data.map((i: any, ind: number) => (<span key={ind}>{i.name}</span>))}</td>
                            </tr> : null}
                        </table>
                    </div>

                    <div dangerouslySetInnerHTML={{
                        __html: marked(data.content || ''),
                    }} className={styles.casino_content}
                    />
                    <Link href="/blog">Go Back</Link>
                </article>
            </Layout>
        </>
    )
}


export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casinos`);
    const data = await res.json();
    const paths = data.data.map((casino: any) => ({
        params: { slug: casino.attributes.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const { slug } = params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/casinos?filters[slug][$eq]=${slug}&populate=*`
    );

    if (!res.ok) {
        return {
            notFound: true,
        };
    }

    const data = await res.json();
    const casino = data.data[0];

    return {
        props: {
            casino,
        },
    };
}
