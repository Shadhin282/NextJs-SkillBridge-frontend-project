"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

export default function NavbarClient({ user }: { user: User | null }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        cache: 'no-cache',
        onSuccess: () => {
          toast.success("Logout Successfully")
          router.refresh()
          router.push("/login");
        },
        onError : ()=>{
          toast.error("Logout failed")
        }
      },
    });
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Avatar className="w-9 h-9">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name} </AvatarFallback>
          </Avatar>
            <span className="text-sm font-medium text-gray-900">
                      {user.name}
                    </span>
          <Button variant="ghost" onClick={handleSignOut}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-black text-white">Get Started</Button>
          </Link>
        </>
      )}
    </div>
  );
}
