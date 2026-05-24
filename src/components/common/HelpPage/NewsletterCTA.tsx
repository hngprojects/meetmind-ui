import { NewsletterForm } from "@/components/common/HelpPage/NewsletterForm";

export function NewsletterCTA() {
  return (
    <section className="w-full bg-white pb-16">
      <div className="max-w-[930px] mx-auto px-6 md:px-8">
        <div className="rounded-2xl px-6 py-12 md:py-14 text-center bg-[#1a6b6b]">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-2 tracking-tight">
            Never miss an update
          </h2>
          <p className="text-white/80 text-xs md:text-sm mb-6 max-w-sm mx-auto leading-relaxed">
            Get notified when we ship new features and improvements.
          </p>
          <NewsletterForm variant="dark" />
        </div>
      </div>
    </section>
  );
}
