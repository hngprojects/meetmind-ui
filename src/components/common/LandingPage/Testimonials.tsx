import TestimonialCard from "./TestimonialCard";

const mobileTestimonials = [
  {
    name: "Amara Nwosu",
    role: "Talent Acquisition Lead",
    company: "Circle",
    quote:
      "Every candidate received a more structured and consistent interview experience. The quality of our evaluations improved immediately.",
    image: "/images/theresa-webb.png",
  },
  {
    name: "James Okafor",
    role: "Engineering Team Lead",
    company: "Circle",
    quote:
      "MeetMind didn't just record the conversation. It understood the discussion, tracked decisions, and helped us stay accountable.",
    image: "/images/darlene-robertson.png",
  },
  {
    name: "David Osei",
    role: "Senior Software Engineer",
    company: "Circle",
    quote:
      "We skipped months of infrastructure work and focused directly on building the experience our users needed.",
    image: "/images/kathryn-murphy.png",
    quoteIcon: "/icons/quote.svg",
    isWide: true,
  },
  {
    name: "Grace Nwosu",
    role: "Recruitment Operations Lead",
    company: "Circle",
    quote:
      "Before MeetMind, aligning interviewers was a constant challenge. Now we all work from the same structure, and decisions are easier to justify.",
    image: "/images/darrell-steward.png",
  },
  {
    name: "Aisha Bello",
    role: "Product Manager",
    company: "Circle",
    quote:
      "What stood out was how quickly we could revisit key moments from a meeting without digging through notes or recordings.",
    image: "/images/kristin-watson.png",
  },
  {
    name: "Tobi Adeyemi",
    role: "Backend Engineer",
    company: "Circle",
    quote:
      "The real value wasn't just transcription. It was how MeetMind turned messy discussions into clear, trackable outcomes we could act on.",
    image: "/images/bessie-cooper.png",
    quoteIcon: "/icons/quote.svg",
    isWide: true,
  },
];

const desktopTestimonials = [
  mobileTestimonials[0], // Theresa
  mobileTestimonials[1], // Darlene
  mobileTestimonials[4], // Kristin
  mobileTestimonials[2], // Kathryn
  mobileTestimonials[3], // Darrell
  mobileTestimonials[5], // Bessie
];

export default function Testimonials() {
  return (
    <section id="temperature" className="py-16 bg-[#E6F0F1]">
      <div className="max-w-97.5 md:max-w-360 mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#3F4555] text-[14px]">Testimonials</p>
          <h2 className="text-[#0F172A] text-[36px] font-semibold text-center mb-2">
            Loved by Remote Teams
          </h2>
          <p className="text-[#3F4555] max-w-md md:max-w-179 text-[16px] lg:text-[18px] text-center">
            Polio is the customer relationship management tool for everyone who
            values collaboration.
          </p>
        </div>

        {/* Desktop: 2x3 equal grid */}
        <div className="mt-12 hidden md:max-w-315 md:grid md:grid-cols-3 md:grid-rows-2 gap-6">
          {desktopTestimonials.map((person) => (
            <TestimonialCard
              key={person.name}
              name={person.name}
              role={person.role}
              company={person.company}
              quote={person.quote}
              image={person.image}
            />
          ))}
        </div>

        {/* Mobile View: 8x1 grid */}
        <div className="mt-12 max-w-85.5 grid grid-cols-1 gap-6 md:hidden">
          {mobileTestimonials.map((person) => (
            <TestimonialCard
              key={person.name}
              name={person.name}
              role={person.role}
              company={person.company}
              quote={person.quote}
              image={person.image}
              quoteIcon={person.quoteIcon}
              isWide={person.isWide}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
