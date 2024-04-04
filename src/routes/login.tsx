import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";
import { useLayoutEffect, useState } from "react";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: LoginComponent,
});

function LoginComponent() {
  const router = useRouter();

  const search = Route.useSearch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationKey: ["login", { username, password }],
    mutationFn: () => AuthService.login(username, password),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = (await mutation.mutateAsync()).data;
      if (user) localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {}
    router.invalidate();
  };
  const user = localStorage.getItem("user");

  const onLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("avatar");
  };

  // Ah, the subtle nuances of client side auth. 🙄
  useLayoutEffect(() => {
    if (user !== null && user !== "" && search.redirect) {
      router.history.push(search.redirect);
    }
  }, [router.history, search.redirect, user]);

  return (
    <div className="flex mt-[300px] justify-center">
      {user !== null && user !== "" ? (
        <div>
          <div className="h-2" />
          <button
            onClick={() => {
              onLogout();
              router.invalidate();
            }}
            className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
          >
            Log out
          </button>
          <div className="h-2" />
        </div>
      ) : (
        <div className="p-6 bg-white w-[500px] rounded-lg">
          <div>You must log in!</div>
          <div className="h-2" />
          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border p-1 px-2 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-1 px-2 rounded"
            />
            <button
              type="submit"
              className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
