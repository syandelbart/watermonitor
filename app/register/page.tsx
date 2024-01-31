"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Label } from "reactstrap";

export default function SignIn() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });
  const router = useRouter();

  async function useSignUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      if (user) router.push("/login");
      else
        setValue({
          ...value,
          error: "Something went wrong",
        });
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) {
        // e is narrowed to Error!
        setValue({
          ...value,
          error: err.message,
        });
      }
    }
  }

  return (
    <main className="justify-center items-center">
      <h1 className="m-10 flex justify-center items-center text-2xl">Log In</h1>
      <div className="m-10 flex justify-center items-center text-2xl text-red-500">
        {value.error && <div>{value.error}</div>}
      </div>
      <div className="flex m-10 flex-col justify-center items-center">
        <Label for="email">E-mail</Label>
        <Input
          className="bg-slate-300 border border-black"
          type="email"
          name="email"
          value={value.email}
          onChange={(event) =>
            setValue({ ...value, email: event.target.value })
          }
          id="Email"
          placeholder="Email"
        />

        <Label for="password" className="mt-4">
          Password
        </Label>
        <Input
          className="bg-slate-300 border border-black "
          type="password"
          name="password"
          value={value.password}
          onChange={(event) =>
            setValue({ ...value, password: event.target.value })
          }
          id="Password"
          placeholder="Password"
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          className="m-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={useSignUp}
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}
