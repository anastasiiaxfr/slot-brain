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

export default function BlogSinglePage({ post }: any) {
    console.log(post.attributes)
    return (
        <>
            <Seo og={og} seo={seo} />
            <Layout>
                <article className="container page">
                    {post.attributes.img?.data?.attributes?.url ? <div className={styles.post_img}>
                        <Image src={post.attributes.img?.data?.attributes?.url} alt={post.attributes.title} height={400} width={800} />
                    </div> : null}
                    <div className={styles.post_info}>
                        {post.attributes?.author ?
                            <span>{post.attributes.author
                                .data.attributes.name}</span>
                            : null}
                        <span>{new Date(post.attributes.publishedAt).toLocaleString()}</span>
                        <span className="chip">{post.attributes.blog_category.data.attributes.name}</span>

                    </div>
                    <h1>{post.attributes.title}</h1>
                    <div dangerouslySetInnerHTML={{
                        __html: marked(post.attributes.content || ''),
                    }} className={styles.post_content}
                    />
                    <Link href="/blog">Go Back</Link>
                </article>
            </Layout>
        </>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
    const data = await res.json();
    const paths = data.data.map((post: any) => ({
        params: { slug: post.attributes.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const { slug } = params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs?filters[slug][$eq]=${slug}&populate=*`
    );

    if (!res.ok) {
        return {
            notFound: true,
        };
    }

    const data = await res.json();
    const post = data.data[0];

    return {
        props: {
            post,
        },
    };
}