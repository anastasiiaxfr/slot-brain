import Layout from "@/components/Layout"

import Subscribe from "@/components/Sections/Subscribe"
import Faq from "@/components/Sections/Faq"

export default function Home() {
  return (
    <Layout>
      <article className="">
        <Faq />
        <Subscribe />
      </article>
    </Layout>
  )
}