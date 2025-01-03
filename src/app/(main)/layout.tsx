import { GenshinOptionsProvider } from "@/hooks/GenshinOptionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GenshinOptionsProvider>
      <main className="grid grid-cols-1 min-h-[100dvh] w-full">
        {children}
      </main>
    </GenshinOptionsProvider>
  );
}
