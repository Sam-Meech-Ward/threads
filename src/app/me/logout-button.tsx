"use client";

export default function LogoutButton({signOut}: {signOut: () => void}) {
  return <button onClick={() => signOut()}>Log Out</button>;
}
