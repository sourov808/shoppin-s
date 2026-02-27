"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Mail, Lock, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const { error: signUpError, data } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        fetchOptions: {
          onSuccess: () => {
            // Reload the page to ensure session is updated across all components
            window.location.href = "/dashboard";
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message || "Failed to create account.");
        setIsLoading(false);
        return;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[420px] rounded-2xl border border-white/20 bg-white/40 dark:bg-black/40 p-8 backdrop-blur-xl shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Create Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Join us and start shopping securely.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground z-10">
                        <UserRound className="h-5 w-5" />
                      </div>
                      <Input
                        placeholder="Full Name"
                        className="pl-10 block w-full rounded-xl border-white/20 bg-white/50 dark:bg-black/50 py-6 text-sm focus-visible:border-primary focus-visible:ring-primary shadow-sm backdrop-blur-sm transition-all outline-none focus-visible:ring-2 disabled:opacity-50"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400 font-medium ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground z-10">
                        <Mail className="h-5 w-5" />
                      </div>
                      <Input
                        placeholder="Email address"
                        type="email"
                        className="pl-10 block w-full rounded-xl border-white/20 bg-white/50 dark:bg-black/50 py-6 text-sm focus-visible:border-primary focus-visible:ring-primary shadow-sm backdrop-blur-sm transition-all outline-none focus-visible:ring-2 disabled:opacity-50"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400 font-medium ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground z-10">
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        type="password"
                        placeholder="Create a password (min 8 chars)"
                        className="pl-10 block w-full rounded-xl border-white/20 bg-white/50 dark:bg-black/50 py-6 text-sm focus-visible:border-primary focus-visible:ring-primary shadow-sm backdrop-blur-sm transition-all outline-none focus-visible:ring-2 disabled:opacity-50"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400 font-medium ml-1" />
                </FormItem>
              )}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400 font-medium">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all disabled:opacity-70 h-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
         By creating an account, you agree to our{" "}
         <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>{" "}
         and{" "}
         <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
