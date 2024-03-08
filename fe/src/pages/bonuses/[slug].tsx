import Layout from "@/components/Layout"
import Seo from "@/components/SEO"
import { marked } from 'marked'
import Image from "next/image"
import Link from "next/link"

import styles from "./styles.module.sass"

import Sidebar from "@/components/Sections/Sidebar"
import Hero from "./Hero"
import Table from "@/components/Sections/Bonuses/Table"

import IconShowMore from "@/assets/icons/reload.svg"

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

export default function BonusesSingelPage({ bonus, all_bonuses, all_posts, all_casinos }: any) {
    console.log(bonus.attributes)
    const data = bonus.attributes

    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <section className="">
                    <Hero data={data} />
                </section>


                <article className="container page">

                    <article className="page-sidebar">
                        <section>
                            {data.thumbnail?.data?.attributes?.url ? <div className={styles.bonus_img}>
                                <Image src={data.thumbnail?.data?.attributes?.url} alt={data.title} height={400} width={800} />
                            </div> : null}

                            <div dangerouslySetInnerHTML={{
                                __html: marked(data.content || ''),
                            }} className={styles.bonus_content}
                            />
                            <Link href="/bonuses" className="btn btn-text">Go Back</Link>

                            <div className={styles.bonus_related}>
                                {all_bonuses.slice(0, 3).map((i: any, ind: number) => (
                                    <Table data={i.attributes} key={ind} />
                                ))}
                            </div>
                            <center>
                                <Link href="/bonuses" className="btn btn-icon">
                                    <IconShowMore width="16" height="16" />
                                    Show more
                                </Link>
                            </center>

                        </section>
                        <aside>
                            <Sidebar posts={all_posts} casinos={all_casinos} />
                        </aside>
                    </article>


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

    const posts = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs?populate=*`
    );

    const casinos = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/casinos?populate=*`
    );

    const bonuses = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bonuses?populate=*`
    );

    if (!res.ok || !posts.ok) {
        return {
            notFound: true,
        };
    }

    const data = await res.json();
    const get_posts = await posts.json();
    const get_casinos = await casinos.json();
    const get_bonuses = await bonuses.json();
    const bonus = data.data[0];
    const all_posts = get_posts.data;
    const all_casinos = get_casinos.data;
    const all_bonuses = get_bonuses.data;

    return {
        props: {
            bonus,
            all_posts,
            all_casinos,
            all_bonuses
        },
    };
}