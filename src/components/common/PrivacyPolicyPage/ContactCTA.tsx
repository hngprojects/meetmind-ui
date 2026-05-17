import Link from 'next/link';

export default function ContactCTA() {
  return (
    <div className="bg-[#0A4C57] rounded-xl px-6 py-8 md:px-5 md:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12">
      <p className="text-white text-sm md:text-base font-medium">
        Our team is here to help clarify any concerns.
      </p>
      <Link
        href="/contact"
        className="bg-white text-[#0A4C57] text-sm font-semibold py-2.5 px-6 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
      >
        Contact us
      </Link>
    </div>
  );
}
