"use server"

import { z } from "zod"
import { action } from "@/utils/safe-action"

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import {db } from "@/db"
import { posts as postsTable } from "@/db/schema/posts"

const CreateSchema = z.object({
  content: z.string(),
})
type CreateSchema = z.infer<typeof CreateSchema>
export const createPost = action(CreateSchema, _createPost)

async function _createPost({content}: CreateSchema) {
  if (content.length < 3) {
    return {message: "not enough content"}
  }

  await db.insert(postsTable).values({
    content,
    userId: "user-1"
  })
  revalidatePath('/')
  redirect(`/`)

}
 
