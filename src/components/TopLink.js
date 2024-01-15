import React from 'react'
import Link from 'next/link'
export default function TopLink({href,title}) {
  return (
    <Link href={href}>
          <div className='flex mb-2 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span className='ml-2 text-white text-opacity-75 '>{title}</span>
          </div>
        </Link>
  )
}
