'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient} from '@/lib/auth-client';
import { ArrowRight, Chrome } from 'lucide-react';
import Link from 'next/link';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const LoginForm = () => {

    const router = useRouter()
    
    const handleLogin = async (e: FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            const email = (e.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
            const password = (e.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement;
            const loginData = {email : email.value,
                password : password.value,
            }
            console.log(loginData)
            try {
              const { data,error } = await authClient.signIn.email(loginData);

            if(error) {
              toast.error(error.message || "Invalid email or password")
                 return;
            }
            toast.success("Login successfull")
            router.refresh()
            router.push('/')
            } catch (error) {
              // console.error(error)
              toast.error("Something error found internally")
              
            }
    }

    const handleSocialLogin = async ()=>{
         const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "https://skillbridge-project.netlify.app/dashboard",
  });
    }

    // const session = authClient.useSession()
    // console.log("session from client ",session)
    return (
        <div className="w-full max-w-2xl mx-auto text-center grid grid-cols-1  gap-8 lg:gap-12">
        {/* Left Column - Form */}
        <div className="flex flex-col justify-center">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-block">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Login to Your
                  <span className="block mt-4">Account</span>
                </h1>
              </div>
              
            </div>

            {/* Form */}
            <form onSubmit={(e)=>handleLogin(e)} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Phone / Email / ArtistID"
                //   value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-full px-6 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Input
                name="password"
                  type="password"
                  placeholder="Passcode"
                //   value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-full px-6 text-base"
                  required
                />
              </div>

              <Button
                type="submit"
                // disabled={isLoading}
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 mt-6"
              >
                Login to Your Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
            <div className="flex flex-col justify-center space-y-4">
          <Button
          disabled
            onClick={handleSocialLogin}
            className="h-12 rounded-full border border-border bg-background hover:bg-muted text-foreground font-semibold text-base flex items-center justify-center gap-3"
          >
            <Chrome className="w-5 h-5" />
            Sign in with Gmail Account
          </Button>

          

          {/* Sign Up Link */}
          <div className="pt-4 text-center">
            <p className="text-muted-foreground">
              Don{"'"}t have an account? <button><Link href="/register" className="text-primary  font-semibold transition-colors">
                Sign Up
              </Link></button>
              
            </p>
          </div>
        </div>
            {/* Forgot Password */}
           
          </div>
        </div>

        {/* Right Column - Social Login */}
        
      </div>
    );
};

export default LoginForm;