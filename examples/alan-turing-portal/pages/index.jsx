import Head from 'next/head'
import fs from 'fs'

import { Card } from '../components/Card'
import { Container } from '../components/Container'
import clientPromise from '../lib/mddb'
import { Index } from 'flexsearch'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

function DatasetCard({ dataset }) {
  return (
    <Card as="article">
      <Card.Title>
        <Link href={dataset.url}>{dataset.title}</Link>
      </Card.Title>
      <Card.Description>
        <span className="font-semibold">Link to publication: </span>{' '}
        <a
          className="text-ellipsis underline transition hover:text-teal-400 dark:hover:text-teal-900"
          href={dataset['link-to-publication']}
        >
          {dataset['link-to-publication']}
        </a>
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Link to data: </span>
        <a
          className="text-ellipsis underline transition hover:text-teal-600 dark:hover:text-teal-900"
          href={dataset['link-to-data']}
        >
          {dataset['link-to-data']}
        </a>
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Task Description: </span>
        {dataset['task-description']}
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Details of Task: </span>{' '}
        {dataset['details-of-task']}
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Size of Dataset: </span>{' '}
        {dataset['size-of-dataset']}
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Percentage Abusive: </span>
        {dataset['percentage-abusive']}%
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Language: </span>
        {dataset['language']}
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Level of Annotation: </span>
        {dataset['level-of-annotation'].join(', ')}
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Platform: </span>
        {dataset['platform'].join(', ')}
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Medium: </span>
        {dataset['medium'].join(', ')}
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Reference: </span>
        {dataset['reference']}
      </Card.Description>
    </Card>
  )
}

function ListOfAbusiveKeywordsCard({ list }) {
  return (
    <Card as="article">
      <Card.Title>
        <Link href={list.url}>{list.title}</Link>
      </Card.Title>
      {list.description && (
        <Card.Description>
          <span className="font-semibold">List Description: </span>{' '}
          {list.description}
        </Card.Description>
      )}
      <Card.Description>
        <span className="font-semibold">Data Link: </span>
        <a
          className="text-ellipsis underline transition hover:text-teal-600 dark:hover:text-teal-900"
          href={list['data-link']}
        >
          {list['data-link']}
        </a>
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Reference: </span>
        <a
          className="text-ellipsis underline transition hover:text-teal-600 dark:hover:text-teal-900"
          href={list.reference}
        >
          {list.reference}
        </a>
      </Card.Description>
    </Card>
  )
}

export default function Home({
  datasets,
  indexText,
  listsOfKeywords,
  availableLanguages,
  availablePlatforms,
}) {
  const index = new Index()
  datasets.forEach((dataset) =>
    index.add(
      dataset.id,
      `${dataset.title} ${dataset['task-description']} ${dataset['details-of-task']} ${dataset['reference']}`
    )
  )
  const { register, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      searchTerm: '',
      lang: '',
      platform: '',
    },
  })
  return (
    <>
      <Head>
        <title>Hate Speech Dataset Catalogue</title>
        <meta
          name="description"
          content="Catalog of abusive language data (PLoS 2020)"
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {indexText.frontmatter.title}
          </h1>
          <article className="index-text prose mt-6 flex flex-col gap-y-2 text-base text-zinc-600 dark:prose-invert prose-h3:mt-4 prose-a:font-normal prose-a:text-zinc-600 prose-a:decoration-inherit prose-img:rounded-none dark:text-zinc-400 prose-a:dark:text-zinc-400 hover:prose-a:text-teal-600 hover:prose-a:dark:text-teal-900">
            <MDXRemote {...indexText} />
          </article>
        </div>
      </Container>
      <Container className="mt-12 md:mt-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 lg:max-w-none">
          <h2
            id="Datasets-header"
            className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
          >
            Datasets
          </h2>
          <form
            onSubmit={handleSubmit(() => reset())}
            className="rounded-2xl border border-zinc-100 px-4 py-6 dark:border-zinc-700/40 sm:p-6"
          >
            <p className="mt-2 text-lg font-semibold text-zinc-600 dark:text-zinc-100">
              Search for datasets
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                placeholder="Search here"
                aria-label="Hate speech on Twitter"
                {...register('searchTerm')}
                className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-600 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-200 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
              />
              <select
                placeholder="Language"
                defaultValue=""
                className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] text-zinc-600 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                {...register('lang')}
              >
                <option value="" disabled hidden>
                  Filter by language
                </option>
                {availableLanguages.map((lang) => (
                  <option
                    key={lang}
                    className="dark:bg-white dark:text-black"
                    value={lang}
                  >
                    {lang}
                  </option>
                ))}
              </select>
              <select
                placeholder="Platform"
                defaultValue=""
                className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] text-zinc-600 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                {...register('platform')}
              >
                <option value="" disabled hidden>
                  Filter by platform
                </option>
                {availablePlatforms.map((platform) => (
                  <option
                    key={platform}
                    className="dark:bg-white dark:text-black"
                    value={platform}
                  >
                    {platform}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="inline-flex flex-none items-center justify-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
              >
                Clear filters
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-16">
            {datasets
              .filter((dataset) =>
                watch().searchTerm && watch().searchTerm !== ''
                  ? index.search(watch().searchTerm).includes(dataset.id)
                  : true
              )
              .filter((dataset) =>
                watch().lang && watch().lang !== ''
                  ? dataset.language === watch().lang
                  : true
              )
              .filter((dataset) =>
                watch().platform && watch().platform !== ''
                  ? dataset.platform.includes(watch().platform)
                  : true
              )
              .map((dataset) => (
                <DatasetCard key={dataset.title} dataset={dataset} />
              ))}
          </div>
        </div>
      </Container>
      <Container className="mt-16">
        <h2 id="Keywords-header" className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Lists of Abusive Keywords
        </h2>
        <div className="mt-3 flex flex-col gap-16">
          {listsOfKeywords.map((list) => (
            <ListOfAbusiveKeywordsCard key={list.title} list={list} />
          ))}
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const mddb = await clientPromise
  const datasetPages = await mddb.getFiles({
    folder: 'datasets',
    extensions: ['md', 'mdx'],
  })
  const datasets = datasetPages.map((page) => ({
    ...page.metadata,
    id: page._id,
    url: page.url_path,
  }))
  const listsOfKeywordsPages = await mddb.getFiles({
    folder: 'keywords',
    extensions: ['md', 'mdx'],
  })
  const listsOfKeywords = listsOfKeywordsPages.map((page) => ({
    ...page.metadata,
    id: page._id,
    url: page.url_path,
  }))

  const index = await mddb.getFileByUrl('/')
  let indexSource = fs.readFileSync(index.file_path, { encoding: 'utf-8' })
  indexSource = await serialize(indexSource, { parseFrontmatter: true })

  const availableLanguages = [
    ...new Set(datasets.map((dataset) => dataset.language)),
  ]
  const availablePlatforms = [
    ...new Set(datasets.map((dataset) => dataset.platform).flat()),
  ]
  return {
    props: {
      datasets,
      listsOfKeywords,
      indexText: indexSource,
      availableLanguages,
      availablePlatforms,
    },
  }
}
