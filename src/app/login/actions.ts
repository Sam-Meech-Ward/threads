"use server";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";

import { db, eq } from "@/db";
import { users as usersTable } from "@/db/schema/users";
import { mightFail } from "might-fail";

export async function login(username: string) {
  cookies().set("username", username);
  const { result: user, error: sqlDatabaseError } = await mightFail(
    db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .then((rows) => rows[0])
  );

  if (sqlDatabaseError) {
    return { error: "SQL Database Error" };
  }
  cookies().set("user_id", user?.id);
  
  redirect("/" + username);
}
