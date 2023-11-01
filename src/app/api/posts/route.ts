import {auth } from "@/auth"

export async function POST(request: Request) {

  const session = await auth()
  if (!session?.user) {
    return new Response("not logged in", {status: 401})
  }
  // post to the database or seomthing

  return Response.json({message: "ok"})
}