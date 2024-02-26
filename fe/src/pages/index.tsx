import Layout from "@/components/Layout"

import Games from "@/components/Sections/Games"
import Blog from "@/components/Sections/Blog"
import Subscribe from "@/components/Sections/Subscribe"
import Faq from "@/components/Sections/Faq"

export default function Home() {
  return (
    <Layout>
      <article className="">
        <Games />
        <Blog />
        <Faq />
        <Subscribe />
      </article>
    </Layout>
  )
}