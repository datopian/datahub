import Link from 'next/link'

export default function Org({ org }) {
  return (
    <organization>
      <img src={org.image_url} className="h-5 w-5 mr-2 inline-block" />
      <Link href={`/@${org.name}`}>
        <a className="font-semibold text-primary underline">{ org.title || org.name }</a>
      </Link>
    </organization>
  )
}
