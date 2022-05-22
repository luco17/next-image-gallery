import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function getStaticProps() {
  const { data } = await supabaseAdmin.from('programs').select('*')
  return {
    props: {
      programs: data,
    },
  }
}

type Program = {
  id: number
  href: string
  programName: string
  coverSrc: string
  tagLine?: string
}

export default function Gallery({ programs }: { programs: Program[] }) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {programs.map((program) => (
          <BlurImage key={program.id} program={program} />
        ))}
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function BlurImage({ program }: { program: Program }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <a href="#" className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={program.coverSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-lg text-gray-900">{program.programName}</h3>
      <p className="mt-1 text-sm font-medium text-gray-500">
        {program.tagLine}
      </p>
    </a>
  )
}

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Gallerio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to the image gallery</h1>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <p className="flex items-center justify-center gap-2">
          Powered by Mr Lucien.
        </p>
      </footer>
    </div>
  )
}

// export default Home
