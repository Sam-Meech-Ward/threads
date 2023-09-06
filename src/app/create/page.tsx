import CreatePostForm from "@/components/create-post-form"
import { notFound } from "next/navigation"
import * as fakeDatabase from "@/fakeDatabase"
export default function Create() {
  const user = fakeDatabase.getUser("sam")
  if (!user) {
    notFound()
  }
  return <CreatePostForm user={user} />
}
