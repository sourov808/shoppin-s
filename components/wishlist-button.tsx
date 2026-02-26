"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleWishlist } from "@/app/actions/wishlist";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface WishlistButtonProps {
  productId: string;
  initialIsHearted?: boolean;
  className?: string;
}

export function WishlistButton({ productId, initialIsHearted = false, className = "" }: WishlistButtonProps) {
  const [isHearted, setIsHearted] = useState(initialIsHearted);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // crucial to prevent Next.js Link from navigating
    e.stopPropagation();

    if (!session?.user) {
      toast.error("Authentication Required", {
        description: "Please sign in to save items to your wishlist.",
      });
      router.push("/login");
      return;
    }

    // Optimistic update
    setIsHearted(!isHearted);

    startTransition(async () => {
      const result = await toggleWishlist(productId);

      if (result.error) {
        // Revert optimistic update
        setIsHearted(!isHearted);
        toast.error("Error", {
          description: result.error,
        });
      } else if (result.success) {
        setIsHearted(result.isHearted || false);
        toast.success(result.isHearted ? "Added to Wishlist" : "Removed from Wishlist", {
          description: result.isHearted ? "Item saved for later." : "Item removed from your saved items.",
        });
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-none drop-shadow-sm disabled:opacity-50 ${className}`}
      aria-label={isHearted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        size={18} 
        className={isHearted ? "fill-red-500 text-red-500" : "text-neutral-800"} 
      />
    </button>
  );
}
