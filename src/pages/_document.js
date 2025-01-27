import { Html, Head, Main, NextScript } from "next/document"
import createEmotionServer from "@emotion/server/create-instance"
import createEmotionCache from "@/createEmotionCache"

export default function Document(props) {
  const { emotionStyleTags } = props
  return (
    <Html>
      <Head>
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      key={style.key}
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}
