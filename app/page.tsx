"use client";
import { getAuth } from 'firebase/auth';
import '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {Label, Input, Alert} from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const auth = getAuth();

export default function SignIn() {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })
  const router = useRouter()


  async function useSignIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      console.log("Logging in succes")
      router.push('/home', { scroll: false })
    } catch (err: unknown) {
      if (err instanceof Error) {
        // e is narrowed to Error!
      setValue({
        ...value,
        error: err.message,
      })
    }
    }
  }

  async function useSignUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
    } catch (err : unknown) {
      if (err instanceof Error) {
        // e is narrowed to Error!
      setValue({
        ...value,
        error: err.message,
      })
    }
    }
  }

  return (
    <main className="justify-center items-center">
      <h1 className="m-10 flex justify-center items-center text-2xl">Log In</h1>
      <div className="m-10 flex justify-center items-center text-2xl text-red-500">
        {value.error && <Alert color="danger" defaultValue={value.error} />}
      </div>
      <div className='flex m-10 flex-col justify-center items-center'>
        <Label for="email">E-mail</Label>
        <Input
          className='bg-slate-300 border border-black'
          type="email"
          name="email"
          value={value.email}
          onChange={(event) => setValue({ ...value, email: event.target.value })}
          id="Email"
          placeholder="Email" />

        <Label for="password" className='mt-4'>Password</Label>
        <Input
          className='bg-slate-300 border border-black '
          type="password"
          name="password"
          value={value.password}
          onChange={(event) => setValue({ ...value, password: event.target.value })}
          id="Password"
          placeholder="Password" />
      </div>

      <div className="flex items-center justify-center">
        <button className="m-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={useSignIn}>
          Sign in
        </button>
        <button className="m-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={useSignUp}>
          Sign Up
        </button>
      </div>
    </main>
  );
}
