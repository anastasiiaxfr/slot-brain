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

    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <article className="container page">
                    <h1>{bonus.attributes.title}</h1>

                    <div className={styles.bonus}>
                        {bonus.attributes.img?.data?.attributes?.url ? <div className={styles.bonus_logo}>
                            <Image src={bonus.attributes.img?.data?.attributes?.url} alt={bonus.attributes.title} height={150} width={300} />
                        </div> : null}
                        <table>
                            <tr>
                                <th>
                                    Offer:
                                </th>
                                <td>
                                    {bonus.attributes.description}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Type:
                                </th>
                                <td>
                                    {bonus.attributes.bonuse_type.data.attributes.name}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Promo Code:
                                </th>
                                <td>
                                    {bonus.attributes.promocode}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Rating:
                                </th>
                                <td>
                                    {bonus.attributes.rating}
                                </td>
                            </tr>

                        </table>
                    </div>

                    {bonus.attributes.thumbnail?.data?.attributes?.url ? <div className={styles.bonus_thumbnail}>
                        <Image src={bonus.attributes.thumbnail?.data?.attributes?.url} alt={bonus.attributes.title} height={400} width={800} />
                    </div> : null}

                    <div dangerouslySetInnerHTML={{
                        __html: marked(bonus.attributes.content || ''),
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