import Image from "next/image"
import Link from "next/link"
import FeedPost from "@/components/feed-post"
import { notFound } from "next/navigation"
import * as fakeDatabase from "@/fakeDatabase"

export default function Profile({ params }: { params: { username: string } }) {
  const user = fakeDatabase.getUser(params.username)
  if (!user) {
    notFound()
  }
  const posts = fakeDatabase.getPostsForUser(user.username)
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <div>{user.username}</div>
        </div>
        <Link href={user.avatar}>
          <div className="rounded-full h-20 w-20 overflow-hidden relative">
            <Image
              className="object-cover"
              src={user.avatar}
              alt={user.username}
              quality={100}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
      </div>

      <div className="mt-10">
        <div className="text-neutral-600 dark:text-neutral-400">{user.followers} followers</div>
      </div>

      <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        <div className="flex flex-col divide-y">
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
