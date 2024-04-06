'use client'

import { useSession } from "next-auth/react"
import Image from 'next/image'

function TopNav() {
    const {data: session} = useSession()
    return (
        <section className='bg-dark w-full sticky top-0 right-0 left-0 z-20 flex items-center justify-between p-3 px-4 shadow-sm'>
            <div className = 'p-1' >
                <h3 className ='text-gray-100 font-xl font-bold uppercase'>Social Media</h3>
            </div>
                <div className ='flex items-center space-x-3'>
                    <div className = 'h-11 w-11 relative '>
                        <Image src={session?.user?.image!} alt='user' fill className='object-cover rounded-full' />
                    </div>
                </div>
        </section>
    )
}

export default TopNav