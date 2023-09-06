import SinglePost from "@/components/single-post"
import FeedPost from "@/components/feed-post"
import * as fakeDatabase from "@/fakeDatabase"

import { notFound } from "next/navigation"

export default function Post({ params }: { params: { id: string } }) {
  const post = fakeDatabase.getPost(+params.id)
  const postResponses = fakeDatabase.getPostResponses(+params.id)
  if (!post) {
    notFound()
  }
  return (
    <div className="flex flex-col divide-y">
      <SinglePost post={post} />
      {postResponses.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  )
}
