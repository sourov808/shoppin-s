"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, MapPin, Building, Hash, Globe } from "lucide-react";
import { updateUserAddress } from "@/app/actions/user";

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
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  zipCode: z.string().min(3, "Valid ZIP/Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateUserAddress(values);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      // Success, move to the dashboard
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/95 flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="rounded-3xl border border-white/20 bg-white/40 dark:bg-black/40 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              Welcome to Stitch
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Please provide your shipping details to complete your profile. You can change this later.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Street Address */}
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <Input
                          placeholder="Street Address (e.g., 123 Main St)"
                          className="pl-10 block w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/50 py-6 text-sm focus-visible:border-primary focus-visible:ring-primary shadow-sm backdrop-blur-sm transition-all"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-5">
                {/* City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Building className="h-5 w-5" />
                          </div>
                          <Input
                            placeholder="City"
                            className="pl-10 block w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/50 py-6 text-sm focus-visible:border-primary focus-visible:ring-primary shadow-sm backdrop-blur-sm transition-all"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* State */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="State / Province"
                          className="block w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/50 py-6 text-sm focus-visible:border-primary focus-visible:ring-primary shadow-sm backdrop-blur-sm transition-all"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* ZIP/Postal Code */}
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Hash className="h-5 w-5" />
                          </div>
                          <Input
                            placeholder="ZIP Code"
                            className="pl-10 block w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/50 py-6 text-sm focus-visible:border-primary focus-visible:ring-primary shadow-sm backdrop-blur-sm transition-all"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Globe className="h-5 w-5" />
                          </div>
                          <Input
                            placeholder="Country"
                            className="pl-10 block w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/50 py-6 text-sm focus-visible:border-primary focus-visible:ring-primary shadow-sm backdrop-blur-sm transition-all"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all bg-primary hover:bg-red-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving Details...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
              
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => router.push("/account")}
                  className="text-sm font-medium text-slate-500 hover:text-primary transition-colors hover:underline"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
