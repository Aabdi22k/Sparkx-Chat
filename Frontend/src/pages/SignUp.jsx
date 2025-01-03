import React, { useState } from "react";
import useAuth from "../hooks/useAuth.js";
import { Link } from "react-router-dom";
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

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(inputs);
  };
  return (
    <div className="flex items-center h-screen">
      <Card className="mx-auto border-none    dark:bg-neutral-800 bg-neutral-200 min-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center mb-2">Signup</CardTitle>
          <CardDescription>
            Please enter all fields correctly to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                className=" dark:text-white text-sm text-black p-3 rounded-lg dark:bg-black bg-white"
                id="fullname"
                type="text"
                value={inputs.fullname}
                onChange={(e) =>
                  setInputs({ ...inputs, fullname: e.target.value })
                }
                placeholder="Full Name"
                required
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                className=" dark:text-white text-sm text-black p-3 rounded-lg dark:bg-black bg-white"
                id="username"
                type="text"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                placeholder="Username"
                required
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className=" dark:text-white text-sm text-black p-3 rounded-lg dark:bg-black bg-white"
                id="password"
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                placeholder="Password"
                required
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <Input
                className=" dark:text-white text-sm text-black p-3 rounded-lg dark:bg-black bg-white"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
              Signup
            </Button>
            <Button variant="outline" className="mt-2 w-full">
              Signup with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an Account ?{" "}
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
