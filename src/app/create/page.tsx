import CreatePostForm from "@/app/create/create-post-form"
import { notFound } from "next/navigation"

import { db, eq, sql } from "@/db"
import { mightFail } from "might-fail"
import { users as usersTable } from "@/db/schema/users"

import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Create() {
  const session = await auth()

  console.log(session)
  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/create")
  }

  console.log(session)

  // const { result: user, error: userQueryError } = await mightFail(
  //   db
  //     .select()
  //     .from(usersTable)
  //     .where(eq(sql`lower(${usersTable.username})`, sql`lower(${username})`))
  //     .then((result) => result[0])
  // )

  // if (userQueryError) {
  //   console.error(userQueryError)
  //   return <div>error connecting to database</div>
  // }

  // if (!user) {
  //   notFound()
  // }
  return <CreatePostForm user={{
    name: session.user.name || "",
    image: session.user.image || "https://www.gravatar.com/avatar/?d=mp",
  }} />
}
