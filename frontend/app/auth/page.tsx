"use client";

import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {


  const router = useRouter()
  const {isAuthenticated} = useAuth()

  useEffect(() => {
    if(isAuthenticated) {
      console.log("Authenticated")
      router.push("/")
    }
  },[])

 

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
