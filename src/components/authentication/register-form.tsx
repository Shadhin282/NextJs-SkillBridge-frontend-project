'use client'

import React, { FormEvent, useState } from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Chrome, Facebook, Apple, Eye, EyeOff, Divide } from 'lucide-react'
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { Field,useForm} from '@tanstack/react-form'

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const formSchema = z.object({
  name : z.string().min(1, "This "),
  email : z.email(),
  password : z.string(),
  image : z.string(),
  role : z.string()
})



const RegisterForm = () => {

  const router = useRouter();
  
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const form = useForm({
      defaultValues : {
        name : '',
        email : '',
        password : '',
        image : '',
        role : ''
      },
      validators: {
        onSubmit : formSchema
      },
      onSubmit : async ({value}) => {

        const toastId = toast.loading("Creating User")
        try {
            const { data,error } = await authClient.signUp.email(value);
            if(error){
              toast.error(error.message,{id : toastId})
              return
            }
            toast.success("Form Submitted Successfully")
            router.push('/')
        } catch (error) {
          toast.error("Something wrong", {id : toastId})
        }
            
            console.log("form data ", value)
      }
    })


    const handleSocialLogin = async ()=>{
       await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3000/dashboard",
  });
    }


    return (
         <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Form */}
        <div className="flex flex-col justify-center">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-block">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Create Your
                  <span className="block">Account</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-md">
                Join thousands of talented professionals and start your journey today
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e)=>{
                e.preventDefault()
              form.handleSubmit()}} className="space-y-4">
       
                <form.Field
                  name='name' 
                  
                 children={(field)=>{
                    return (
                        <div className="space-y-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="full name"
                  value={field.state.value}
                  onChange={(e)=>field.handleChange(e.target.value as string)}
                  className="h-12 rounded-full px-6 text-base"
                  required
                />
              </div>
                    )
                 }}
                />
                
                <form.Field
                  name='email' 
                  children={(field)=> {
                    return (
                    <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={field.state.value}
                  onChange={(e)=>field.handleChange(e.target.value)}
                  className="h-12 rounded-full px-6 text-base"
                  required
                />
              </div>
                  )
                  }
                   }
                />
                <form.Field
                  name='password' 
                  children={(field)=> {
                    return (
                     <div className="space-y-2 relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={field.state.value}
                  onChange={(e)=>field.handleChange(e.target.value)}
                  className="h-12 rounded-full px-6 text-base pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
                  )
                  }
                   }
                />

                 <form.Field
                  name='image' 
                  children={(field)=> {
                    return (
                    <div className="space-y-2">
                <Input
                  type="link"
                  name="image"
                  placeholder="Photo"
                  value={field.state.value}
                  onChange={(e)=>field.handleChange(e.target.value)}
                  className="h-12 rounded-full px-6 text-base"
                  required
                />
              </div>
                  )
                  }
                   }
                />
                <form.Field
                  name='role' 
                  children={(field)=> {
                    return (
                     <div className="space-y-2 relative">
               <Select
   name='role'
          value={field.state.value}
          onValueChange={field.handleChange}
  required
>
  <SelectTrigger className="h-12 rounded-full px-6 text-base">
    <SelectValue placeholder="Select your role" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value='STUDENT' >STUDENT</SelectItem>
    <SelectItem value='TUTOR'>TUTOR</SelectItem>
  </SelectContent>
</Select>
                
              </div>
                  )
                  }
                   }
                />
             

             

             

             

              <Button
                type="submit"
                // disabled={isLoading}
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 mt-6"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            {/* Terms */}
            <p className="text-sm text-muted-foreground text-center">
              By creating an account, you agree to our{' '}
              <Link href="#" className="text-primary hover:text-primary/90 font-semibold">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column - Social Signup */}
        <div className="flex flex-col justify-center space-y-4">
          <p className="text-center font-semibold text-foreground mb-4">Or sign up with</p>

          <Button
            onClick={() => handleSocialLogin()}
            className="h-12 rounded-full border border-border bg-background hover:bg-muted text-foreground font-semibold text-base flex items-center justify-center gap-3"
          >
            <Chrome className="w-5 h-5" />
            Sign up with Gmail Account
          </Button>

          <Button
            // onClick={() => handleSocialLogin('facebook')}
            disabled
            className="h-12 rounded-full border border-border bg-background hover:bg-muted text-foreground font-semibold text-base flex items-center justify-center gap-3"
          >
            <Facebook className="w-5 h-5" />
            Sign up Facebook Account
          </Button>

          <Button
          disabled
            // onClick={() => handleSocialLogin('apple')}\
            className="h-12 rounded-full border border-border bg-background hover:bg-muted text-foreground font-semibold text-base flex items-center justify-center gap-3"
          >
            <Apple className="w-5 h-5" />
            Sign up Apple Secure ID
          </Button>

          {/* Sign In Link */}
          <div className="pt-4 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary/90 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default RegisterForm;