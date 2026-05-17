import TestimonialCard from "./TestimonialCard";

const mobileTestimonials = [
  {
    name: "Theresa Webb",
    role: "Product Manager",
    company: "Circle",
    quote:
      "We use Polio on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
    image: "/images/theresa-webb.png",
  },
  {
    name: "Darlene Robertson",
    role: "Product Manager",
    company: "Circle",
    quote:
      "We use Polio on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
    image: "/images/darlene-robertson.png",
  },
  {
    name: "Kathryn Murphy",
    role: "Product Manager",
    company: "Circle",
    quote:
      "We use Polio on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
    image: "/images/kathryn-murphy.png",
    quoteIcon: "/icons/quote.svg",
    isWide: true,
  },
  {
    name: "Darrell Steward",
    role: "Product Manager",
    company: "Circle",
    quote:
      "We use Polio on a daily basis for several internal processes, and I cannot rave enough about them.",
    image: "/images/darrell-steward.png",
  },
  {
    name: "Kristin Watson",
    role: "Product Manager",
    company: "Circle",
    quote:
      "We use Polio on a daily basis for several internal processes, and I cannot rave enough about them.",
    image: "/images/kristin-watson.png",
  },
  {
    name: "Bessie Cooper",
    role: "Product Manager",
    company: "Circle",
    quote:
      "We use Polio on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
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
