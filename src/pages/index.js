import React from "react"
import Portal from "../components/Portal"

import viewStatUpdate from "../tools/viewStatUpdate.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "semantic-ui-css/semantic.min.css"
import "normalize.css"

viewStatUpdate()

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Portal />
  </Layout>
)

export default IndexPage
