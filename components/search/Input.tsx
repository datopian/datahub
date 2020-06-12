import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Input({ query }) {
  const router = useRouter()
  const [q, setQ] = useState(query.q)

  const handleChange = (event) => {
    setQ(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push({
      pathname: '/search',
      query: { q },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
         type='text'
         name='q'
         value={q}
         onChange={handleChange}
         placeholder='Search'
         aria-label='Search'
       />
    </form>
  )
}
