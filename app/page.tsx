import type { Metadata } from 'next'
import { BlogPosts } from 'app/components/posts'

export const metadata: Metadata = {
  verification: {
    google: '1EKCO0vfh97iivAwsCmgvwiubupXBqrCSwai59fUpo4', 
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Zaidan Dhiyaurrahman
      </h1>
      <p className="mb-4">
        {`I'm a 3rd semester Information System & Technology student at Institut Teknologi Bandung. I'm interested in software engineering`}
      </p>
    </section>
  )
}
