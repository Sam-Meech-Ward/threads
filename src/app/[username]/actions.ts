"use server";

import { redirect } from 'next/navigation'

import { cookies } from "next/headers";

export async function logout() {
  cookies().delete("username");
  redirect("/login")
}
