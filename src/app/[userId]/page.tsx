import FeedPost from "@/components/feed-post"
import { notFound } from "next/navigation"

import { users as usersTable } from "@/db/schema/users"
import { db, eq, sql } from "@/db"
import { userPostsQuery } from "@/db/queries/postsFeed"
import { mightFail } from "might-fail"

import Profile from "./profile"

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const { result: user, error: userQueryError } = await mightFail(
    db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, params.userId))
      .then((result) => result[0])
  )

  if (userQueryError) {
    console.error(userQueryError)
    return <div>error connecting to database</div>
  }

  if (!user) {
    notFound()
  }

  const { result: posts, error: postsQueryError } = await mightFail(
    userPostsQuery.execute({ userId: user.id })
  )

  return (
    <>
      <Profile user={user} />

      <div className="mt-10">
        {/* <div className="text-neutral-600 dark:text-neutral-400">{user.followers} followers</div> */}
      </div>

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
