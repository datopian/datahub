import Link from 'next/link'

export default function Org({ org }) {
  return (
    <>
    {org
      ? <>
          <img src={org.image_url || 'https://datahub.io/static/img/datahub-cube-edited.svg'} className="h-5 w-5 mr-2 inline-block" />
          <Link href={`/@${org.name}`}>
            <a className="font-semibold text-primary underline">{ org.title || org.name }</a>
          </Link>
        </>
      : ''
    }
    </>
  )
}
