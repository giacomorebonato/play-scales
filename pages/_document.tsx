import { ColorModeScript } from '@chakra-ui/react'
import { extractCritical } from '@emotion/server'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import theme from '../lib/theme'

type DocumentProps = {
  css: string
  ids: number[]
}

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const page = await ctx.renderPage()
    const styles = extractCritical(page.html)
    return { ...initialProps, ...page, ...styles }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
