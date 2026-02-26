"use client";

import { useState } from "react";
import { EditProfileModal } from "@/components/dashboard/edit-profile-modal";
import { EditAddressModal, AddressFormData } from "@/components/dashboard/edit-address-modal";

interface DashboardClientProps {
  user: {
    name: string;
    email: string;
    image: string | null;
    createdAt: Date;
  };
  address: AddressFormData | null;
}

export function DashboardClient({ user, address }: DashboardClientProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-[#8a6760] dark:text-slate-400 mt-1">
            Welcome back, {user.name.split(' ')[0]}! Here&apos;s what&apos;s happening with your account.
          </p>
        </div>
        <button 
          onClick={() => setIsProfileModalOpen(true)}
          className="bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 rounded-lg font-medium transition-colors border border-primary/20 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
          Edit Profile
        </button>
      </div>

      {/* Bottom Grid: Address & Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Default Address Card */}
        <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-[#3a2522] shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">home</span>
              <h3 className="font-bold text-lg text-neutral-800 dark:text-white">Default Shipping</h3>
            </div>
            <button 
              onClick={() => setIsAddressModalOpen(true)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Edit
            </button>
          </div>
          
          <div className="flex-1">
            <p className="font-semibold text-neutral-800 dark:text-white mb-1">{user.name}</p>
            {address ? (
              <p className="text-[#8a6760] dark:text-slate-400 text-sm leading-relaxed">
                {address.street}<br />
                {address.city}, {address.state} {address.zipCode}<br />
                {address.country}
              </p>
            ) : (
              <p className="text-slate-400 text-sm italic py-4">
                No default address provided yet.
              </p>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#3a2522]">
            <button 
              onClick={() => setIsAddressModalOpen(true)}
              className="text-[#8a6760] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">{address ? 'edit' : 'add'}</span> 
              {address ? 'Update Address' : 'Add New Address'}
            </button>
          </div>
        </div>

        {/* Payment Methods Card - Static for now */}
        <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-[#3a2522] shadow-sm p-6 flex flex-col h-full opacity-70">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">credit_card</span>
              <h3 className="font-bold text-lg text-neutral-800 dark:text-white">Payment Method</h3>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-3">
             <span className="material-symbols-outlined text-4xl text-slate-300">lock</span>
             <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Secured by Stripe</p>
             <p className="text-xs text-slate-400 text-center">Payment methods are managed during checkout.</p>
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        currentName={user.name} 
      />
      
      <EditAddressModal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)} 
        currentAddress={address} 
      />
    </>
  );
}
