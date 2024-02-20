import { ClientNav } from "@/components/navigation/client-nav";

interface GalleryLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: GalleryLayoutProps) {
  return (
    <>
      <ClientNav />
      {children}
    </>
  );
}
