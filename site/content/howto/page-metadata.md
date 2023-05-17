# How to customize the page metadata e.g title, favicon?

- Install the following packages

```
npm install next-seo
```

- Add the following tag to the `MyApp` component in `/pages/_app.tsx`

```
<DefaultSeo {...YOUR ATTRIBUTES GO HERE} />
```

- You can check all the possible options at the [project readme](https://github.com/garmeeh/next-seo#nextseo-options)

Below is an example of a typical configuration

```
 <DefaultSeo
      title="Using More of Config"
      description="This example uses more of the available config options."
      canonical="https://www.canonical.ie/"
      openGraph={{
        url: 'https://www.url.ie/a',
        title: 'Open Graph Title',
        description: 'Open Graph Description',
        images: [
          {
            url: 'https://www.example.ie/og-image-01.jpg',
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
            type: 'image/jpeg',
          },
          {
            url: 'https://www.example.ie/og-image-02.jpg',
            width: 900,
            height: 800,
            alt: 'Og Image Alt Second',
            type: 'image/jpeg',
          },
          { url: 'https://www.example.ie/og-image-03.jpg' },
          { url: 'https://www.example.ie/og-image-04.jpg' },
        ],
        siteName: 'SiteName',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
```
