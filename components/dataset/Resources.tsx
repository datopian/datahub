import Link from 'next/link'

export default function Resources({ resources }) {
  return (
    <ul>
      {resources.map((resource, index) => (
          <li key={index}>
            <Link href={`r/${resource.name}`}>
              <a className="text-xl font-semibold text-primary">{ resource.title || resource.name }</a>
            </Link>
          </li>
        )
      )}
    </ul>
  )
}
