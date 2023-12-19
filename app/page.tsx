'use client'

import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Login() {
  const {push} = useRouter();
  const { user, error, isLoading } = useUser();

  if (user) {
    push('/profile')
  }

  if (isLoading) {
    return (
      <div>
        ...loading
      </div>
    )
  }
  if (error) {
    return(
      <div>
        {error.message}
      </div>
    )
  }
  const handleLogin = ()=>push('api/auth/login')
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className='w-[300px] md:w-[600px] shadow-lg p-5'>
        <p className='text-5xl'>
          Login
        </p>
        <div className='h-[20px]' />
        <form>
          <input type="email" placeholder="E-mail" className='border-2 border-black w-full p-5 text-2xl rounded-lg focus:outline-blue-400' name="email" />
          <div className='h-[20px]' />
          <input type="password" placeholder="Password" className='border-2 border-black w-full p-5 text-2xl rounded-lg focus:outline-blue-400' name="password" />
          <div className='h-[40px]' />
          <div className='flex justify-end'>
            <button className='border-2 border-black p-5 px-10 text-2xl rounded-lg'>Try Me</button>
          </div>
        </form>
        <div className='h-[20px]' />
        <p className="flex justify-center font-bold text-2xl">Or</p>

        <div className='h-[20px]' />
        <button onClick={handleLogin} className='border-2 w-full border-black p-5 px-10 text-2xl rounded-lg'>Sign in with Auth0</button>
      </div>
    </main>
  )
}