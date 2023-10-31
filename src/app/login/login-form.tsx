"use client";

import { useState } from "react";

import { login } from "./actions";

export default function LoginForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <div className="border border-neutral-500 rounded-lg px-4 py-2">
        <input
          className="bg-transparent flex-1 border-none outline-none"
          type="text"
          placeholder="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button type="submit" className={"border rounded-xl px-4 py-2 disabled"}>
        Log In
      </button>
    </form>
  );
}
