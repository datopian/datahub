import Link from 'next/link'

export default function Org({ org }) {
  return (
    <Link href={`/@${org.name}`}>
      <a className="text-2xl font-semibold text-primary">{ org.title || org.name }</a>
    </Link>
  )
}
