import Image from 'next/image';

export default function AuthNavbar() {
  return (
    <nav className="w-full py-6">
      <div className="flex items-center justify-center gap-8">
        <Image
          src="/images/dfi-logo.png"
          alt="DFI Logo"
          width={120}
          height={60}
          className="object-contain"
        />
        <Image
          src="/images/fortesoft-logo.png"
          alt="Fortesoft Logo"
          width={120}
          height={60}
          className="object-contain"
        />
      </div>
    </nav>
  );
}