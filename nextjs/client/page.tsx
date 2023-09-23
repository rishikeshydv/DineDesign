'use client'
import Card from '@/components/userCard'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


export default function ClientPage() {
    const { data:session} = useSession ({
        required:true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })
  return (
    <section className='flex flex-col gap-6'>
            <Card user = {session?.user} pagetype={"Client"}/>
    </section>
  )
}
