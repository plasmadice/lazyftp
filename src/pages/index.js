import React from "react"
// import { Link } from "gatsby"
import Portal from "../components/Portal"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import "semantic-ui-css/semantic.min.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Portal />
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
