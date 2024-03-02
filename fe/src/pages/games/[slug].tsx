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

export default function GamesSinglePage({ game }: any) {
    console.log(game.attributes);
    const data = game.attributes;

    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <article className="container page">
                    <h1>{data.title}</h1>

                    {data.img.data?.attributes?.url ? <div className={styles.casino_logo}>
                        <Image src={data.img.data.attributes.url} alt={data.title} height={150} width={300} />
                    </div> : null}

                    <div className={styles.game_data}>
                        <table>
                            <tr>
                                <th>Type: </th>
                                <td>{data.game_type.data.attributes.name}</td>
                            </tr>
                            <tr>
                                <th>Provider: </th>
                                <td>{data.game_provider.data.attributes.name}</td>
                            </tr>

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`);
    const data = await res.json();
    const paths = data.data.map((game: any) => ({
        params: { slug: game.attributes.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const { slug } = params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/games?filters[slug][$eq]=${slug}&populate=*`
    );

    if (!res.ok) {
        return {
            notFound: true,
        };
    }

    const data = await res.json();
    const game = data.data[0];

    return {
        props: {
            game,
        },
    };
}



