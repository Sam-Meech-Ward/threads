import FeedPost from "@/components/feed-post"
import { notFound, redirect } from "next/navigation"

import { users as usersTable } from "@/db/schema/users"
import { db, eq, sql } from "@/db"
import { userPostsQuery } from "@/db/queries/postsFeed"
import { mightFail } from "might-fail"

import Profile from "./profile"

import { auth } from "@/auth"

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/me")
  }


  const { result: posts, error: postsQueryError } = await mightFail(
    userPostsQuery.execute({ userId: session.user.id })
  )


  return (
    <>
      <Profile user={session.user} />

      <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        <div className="flex flex-col divide-y">
          {posts?.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
