import Link from 'next/link';

export default function ContactCTA() {
  return (
    <div className="bg-[#0A4C57] rounded-xl px-6 py-6 md:px-10 md:py-8 flex flex-col sm:flex-row items-center sm:items-center justify-between text-center sm:text-left gap-4 mt-12 max-w-xs sm:max-w-7xl mx-auto w-full">
      <p className="text-white text-sm md:text-base font-medium">
        Our team is here to help clarify any concerns.
      </p>
      <Link
        href="/contact"
        className="bg-white text-[#0A4C57] text-sm font-semibold py-2.5 px-6 rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D9E8EA] focus-visible:ring-offset-[#0A4C57] transition-colors whitespace-nowrap w-full sm:w-auto inline-block text-center"
      >
        Contact us
      </Link>
    </div>
  );
}