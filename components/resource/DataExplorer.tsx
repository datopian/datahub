import Link from 'next/link'

export default function DataExplorer({ resource }) {
  return <>{JSON.stringify(resource)}</>
}
