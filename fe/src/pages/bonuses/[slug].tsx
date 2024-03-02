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

export default function BonusesSingelPage({ bonus }: any) {
    console.log(bonus.attributes)
    const data = bonus.attributes

    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <article className="container page">
                    <h1>{data.title}</h1>

                    <div className={styles.bonus}>
                        {data.img?.data?.attributes?.url ? <div className={styles.bonus_logo}>
                            <Image src={data.img?.data?.attributes?.url} alt={data.title} height={150} width={300} />
                        </div> : null}
                        <table className="table">
                            <tr>
                                <th> Offer: </th>
                                <td> {data.description} </td>
                            </tr>
                            <tr>
                                <th> Type: </th>
                                <td> {data.bonuse_type.data.attributes.name} </td>
                            </tr>
                            <tr>
                                <th> Promo Code: </th>
                                <td> {data.promocode} </td>
                            </tr>
                            <tr>
                                <th> Rating: </th>
                                <td> {data.rating} </td>
                            </tr>
                            {data.payment_methods ? <tr>
                                <th> Payment methods: </th>
                                <td>{data.payment_methods.data.map((i: any, ind: number) => (<span key={ind}>{i.attributes.code}</span>))}</td>
                            </tr> : null}
                            {data.currencies ? <tr>
                                <th>Currencies: </th>
                                <td>{data.currencies.data.map((i: any, ind: number) => (<span key={ind}>{i.attributes.code}</span>))}</td>
                            </tr> : null}
                            {data.countries ? <tr>
                                <th>GEO: </th>
                                <td>{data.countries.data.map((i: any, ind: number) => (<span key={ind}>{i.attributes.code}</span>))}</td>
                            </tr> : null}
                            {data.free_spin ? <tr>
                                <th>Free Spins: </th>
                                <td>{data.free_spin.data.attributes.value}</td>
                            </tr> : null}

                        </table>
                    </div>

                    {data.thumbnail?.data?.attributes?.url ? <div className={styles.bonus_img}>
                        <Image src={data.thumbnail?.data?.attributes?.url} alt={data.title} height={400} width={800} />
                    </div> : null}

                    <div dangerouslySetInnerHTML={{
                        __html: marked(data.content || ''),
                    }} className={styles.bonus_content}
                    />

                    <Link href="/bonuses">Go Back</Link>
                </article>
            </Layout>
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bonuses`);
    const data = await res.json();
    const paths = data.data.map((bonus: any) => ({
        params: { slug: bonus.attributes.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}



export async function getStaticProps({ params }: any) {
    const { slug } = params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bonuses?filters[slug][$eq]=${slug}&populate=*`
    );

    if (!res.ok) {
        return {
            notFound: true,
        };
    }

    const data = await res.json();
    const bonus = data.data[0];

    return {
        props: {
            bonus,
        },
    };
}