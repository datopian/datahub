import Head from 'next/head'
import fs from 'fs'

import { Card } from '../components/Card'
import { Container } from '../components/Container'
import clientPromise from '@/lib/mddb'
import ReactMarkdown from 'react-markdown'
import { Index } from 'flexsearch'
import { useForm } from 'react-hook-form'

function DatasetCard({ dataset }) {
  return (
    <Card as="article">
      <Card.Title>{dataset.title}</Card.Title>
      <Card.Description>
        <span className="font-semibold">Link to publication: </span>{' '}
        <a
          className="underline transition hover:text-teal-400 dark:hover:text-teal-900 text-ellipsis"
          href={dataset['link-to-publication']}
        >
          {dataset['link-to-publication']}
        </a>
      </Card.Description>
      <Card.Description>
        <span className="font-semibold">Link to data: </span>
        <a
          className="underline transition hover:text-teal-600 dark:hover:text-teal-900 text-ellipsis"
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
export default function Home({ datasets, indexText, availableLanguages, availablePlatforms }) {
  const index = new Index()
  datasets.forEach((dataset) => index.add(dataset.id, `${dataset.title} ${dataset['task-description']} ${dataset['details-of-task']} ${dataset['reference']}`))
  const { register, watch } = useForm({ defaultValues: {
    searchTerm: '',
    lang: '',
    platform: ''
  }})
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
            Hate Speech Dataset Catalogue
          </h1>
          <article className="mt-6 flex flex-col gap-y-2 text-base text-zinc-600 dark:text-zinc-400">
            <ReactMarkdown>{indexText}</ReactMarkdown>
          </article>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-8 lg:max-w-none">
          <form className="rounded-2xl border border-zinc-100 px-4 py-6 sm:p-6 dark:border-zinc-700/40">
            <p className="mt-2 text-lg font-semibold text-zinc-600 dark:text-zinc-100">
              Search for datasets
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                placeholder="Search here"
                aria-label="Hate speech on Twitter"
                required
                {...register('searchTerm')}
                className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-600 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-200 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
              />
              <select
                placeholder="Language"
                defaultValue=""
                className="min-w-0 flex-auto text-zinc-600 appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                {...register('lang')}
              >
                <option value="" disabled hidden>Filter by language</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} className='dark:bg-white dark:text-black' value={lang}>{lang}</option>
                ))}
              </select>
              <select
                placeholder="Platform"
                defaultValue=""
                className="min-w-0 flex-auto text-zinc-600 appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                {...register('platform')}
              >
                <option value="" disabled hidden>Filter by platform</option>
                {availablePlatforms.map((platform) => (
                  <option key={platform} className='dark:bg-white dark:text-black' value={platform}>{platform}</option>
                ))}
              </select>
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
    </>
  )
}

export async function getStaticProps() {
  const mddb = await clientPromise
  const allPages = await mddb.getFiles({ extensions: ['md', 'mdx'] })
  const datasets = allPages
    .filter((page) => page.url_path !== '/')
    .map((page) => ({ ...page.metadata, id: page._id }))
  const index = allPages.filter((page) => page.url_path === '/')[0]
  const source = fs.readFileSync(index.file_path, { encoding: 'utf-8' })
  const availableLanguages = [... new Set(datasets.map((dataset) => dataset.language))]
  const availablePlatforms = [... new Set(datasets.map((dataset) => dataset.platform).flat())]
  return {
    props: {
      indexText: source,
      datasets,
      availableLanguages,
      availablePlatforms,
    },
  }
}
