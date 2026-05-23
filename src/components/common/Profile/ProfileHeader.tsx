import Image from "next/image";

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm">
        <Image
          src="/images/profile-icon.png"
          alt="John Micheal"
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">John Micheal</h1>
        <p className="text-sm text-[#5E6470] font-medium">Hiring Manager</p>
      </div>
    </div>
  );
}
