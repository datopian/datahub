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
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
         type='text'
         name='q'
         value={q}
         onChange={handleChange}
         placeholder='Search'
         aria-label='Search'
         className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 w-1/2 rounded-lg py-2 px-4 block appearance-none leading-normal"
       />
      <button onClick={handleSubmit} className="inline-block text-sm px-4 py-3 mx-3 leading-none border rounded text-white bg-black border-black lg:mt-0">Search</button>
    </form>
  )
}
