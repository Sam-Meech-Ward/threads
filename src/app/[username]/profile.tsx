import Image from "next/image";
import Link from "next/link";

import { type User } from "@/db/schema/users";

import LogoutButton from "./logout-button"

export default async function Profile({ user }: { user: User }) {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-3xl font-semibold">
          {user.firstName} {user.lastName}
        </h2>
        <div>{user.username}</div>
        <LogoutButton />
      </div>
      <Link href={user.avatar}>
        <div className="rounded-full h-20 w-20 overflow-hidden relative">
          <Image
            className="object-cover"
            src={user.avatar}
            alt={user.username}
            quality={100}
            priority={true}
            fill={true}
          />
        </div>
      </Link>
    </div>
  );
}
