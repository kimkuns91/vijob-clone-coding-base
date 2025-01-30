'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HeroSection from '@/components/layout/HeroSection';
import LocationSheet from '@/components/LocationSheet';
import OccupationSheet from '@/components/OccupationSheet';

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <main className="w-full h-full flex flex-row justify-center bg-black max-[860px]:bg-white">
      <div className="flex flex-row justify-center w-full h-full max-w-[860px]">
        <HeroSection />
        <div className="relative w-full max-w-[430px] max-[860px]:max-w-full">
          <LocationSheet />
          {children}
          <OccupationSheet />
        </div>
      </div>
    </main>
  );
};
