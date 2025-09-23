'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Error() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message') || 'Something went wrong'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
        <div>
          <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
          <p className="mt-4 text-gray-600">{message}</p>
        </div>

        <Link
          href="/"
          className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Try again
        </Link>
      </div>
    </div>
  )
}