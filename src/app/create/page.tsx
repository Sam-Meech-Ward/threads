import CreatePostForm from "@/app/create/create-post-form"
import { notFound } from "next/navigation"

import { db, eq, sql } from "@/db"
import { mightFail } from "might-fail"
import { users as usersTable } from "@/db/schema/users"

export default async function Create() {
  const username = "sam"
  const { result: user, error: userQueryError } = await mightFail(
    db
      .select()
      .from(usersTable)
      .where(eq(sql`lower(${usersTable.username})`, sql`lower(${username})`))
      .then((result) => result[0])
  )

  if (userQueryError) {
    console.error(userQueryError)
    return <div>error connecting to database</div>
  }

  if (!user) {
    notFound()
  }
  return <CreatePostForm user={user} />
}
