import qs from 'qs'
import Link from "next/link"
import Layout from "@/components/Layout"
import Seo from "@/components/SEO"
import { marked } from 'marked'
import FaqBanner from "@/assets/img/faq.jpg"
import ArrIcon from "@/assets/icons/arr-r.svg"
import { Disclosure } from '@headlessui/react'

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
    { property: 'og:image', content: `${process.env.NEXT_PUBLIC_HOST}/ua/og_600x300.jpg` },
    { property: 'og:image:width', content: '600' },
    { property: 'og:image:height', content: '300' },
    { property: 'og:locale', content: 'uk' },
    { property: 'og:section', content: 'Blog' },
    { property: 'og:published_time', content: '2020-07-21T08:17:33+01:00' },
]

const FaqParentPage = ({ data }: any) => {
    const faq = data.attributes

    const faqs = faq.faq.slice(0, 10).map((item: any) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
        }
    }));

    const schema = {
        "@context": "http://schema.org/",
        "@type": "FAQPage",
        "mainEntity": faqs
    }

    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <article className="container page">
                    <h1>{faq.title}</h1>

                    <dl className={styles.faq}>
                        {faq.faq.map((i: any, ind: number) => (
                            <Disclosure as="div" key={ind} className="">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7">{i.question}</span>
                                                <span className="">
                                                    {open ? (
                                                        <ArrIcon aria-hidden="true" />
                                                    ) : (
                                                        <ArrIcon aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="">
                                            <p className="text-base leading-7 text-gray-600">{i.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>

                </article>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema),
                    }}
                ></script>
            </Layout >
        </>
    )
}
export async function fetchTerms(params?: any) {
    const query = qs.stringify(params)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faq?${query}`)
    const json = await res.json()
    return json.data
}


export async function getStaticProps() {
    const data = (await fetchTerms({ populate: 'deep' })) || []

    return {
        props: {
            data,
        },
        revalidate: 60 * 1
    }
}


export default FaqParentPage
