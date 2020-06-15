import Link from 'next/link'

export default function DataView({ resource }) {
  return (
    <>
      {JSON.stringify(resource, null, 2)}
    </>
  )
}
