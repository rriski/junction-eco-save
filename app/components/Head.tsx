import React from "react";

import NextHead from 'next/head'

interface Props {
  title?: string
}

const Head = ({ title }: Props) => (
  <NextHead>
    <title>{title || "Timon kartta appis"}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
  </NextHead>
)

export default Head;