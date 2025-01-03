import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { Button } from "../components/Shadcn/Button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Shadcn/Card.tsx";
import { Input } from "../components/Shadcn/Input.tsx";
import { Label } from "../components/Shadcn/Label.tsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    await login(username, password);
  };

  return (
      <div className="flex items-center h-screen">
        <Card className="mx-auto border-none    dark:bg-neutral-800 bg-neutral-200 min-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center mb-2">Login</CardTitle>
        <CardDescription>
          Please enter your username and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              className=" dark:text-white text-sm text-black p-3 rounded-lg dark:bg-black bg-white"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              className=" dark:text-white text-sm text-black p-3 rounded-lg dark:bg-black bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Password"
              required
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
          <Button  onClick={handleSubmit} type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="mt-2 w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={'/signup'} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
      </div>
  );
}
