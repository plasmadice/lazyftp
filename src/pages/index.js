import React from "react"
import Portal from "../components/Portal"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "semantic-ui-css/semantic.min.css"
import "normalize.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Portal />
  </Layout>
)

export default IndexPage
