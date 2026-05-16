import { NewsletterForm } from "./NewsletterForm";

export function NewsletterCTA() {
  return (
    <section className="w-full bg-white px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-2xl px-8 py-14 text-center"
          style={{ backgroundColor: "#1a6b6b" }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3 leading-tight">
            Never miss an update
          </h2>
          <p className="text-white/75 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Get notified when we ship new features and improvements.
          </p>
          <NewsletterForm variant="dark" />
        </div>
      </div>
    </section>
  );
}