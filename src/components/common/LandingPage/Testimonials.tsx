const wideTestimonials = [
  {
    name: "Theresa Webb",
    role: "Product Manager",
    company: "Circle",
    quote:
      '"We use Polio on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI."',
    image: "/images/theresa-webb.png",
  },
  {
    name: "Darlene Robertson",
    role: "Product Manager",
    company: "Circle",
    quote:
      '"We use Polio on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI."',
    image: "/images/darlene-robertson.png",
  },
];

export default function Testimonials() {
  return (
    <section id="temperature" className="py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[#3F4555] text-xs">Testimonials</p>
          <h2 className="text-[#0F172A] text-3xl font-semibold text-center">
            Loved by Remote Teams
          </h2>
          <p className="text-[#3F4555] text-xs text-center max-w-md">
            Polio is the customer relationship management tool for everyone who
            values collaboration.
          </p>
        </div>

        {/* Two wide cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {wideTestimonials.map((person) => (
            <div
              key={person.name}
              className="bg-[#FFFFFF] rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6 pt-4">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-[#030712] text-sm font-semibold">
                    {person.name}
                  </p>
                  <p className="text-[#3F4555] text-xs">
                    {person.role}, {person.company}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-5 text-[#0F172A]">{person.quote}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {/* Kathryn Murphy */}
          <div className="md:row-span-2 bg-[#FFFFFF] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/kathryn-murphy.png"
                  alt="Kathryn Murphy"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p className="text-[#030712] text-sm font-semibold">
                    Kathryn Murphy
                  </p>

                  <p className="text-[#3F4555] text-xs">
                    Product Manager, Circle
                  </p>
                </div>
              </div>

              <p className="text-sm leading-5 text-[#0F172A]">
                "We use Polio on a daily basis for several internal processes,
                and I cannot rave enough about them. Incredible flexibility and
                features combined with super intuitive UI."
              </p>
            </div>

            <div className="flex justify-end mt-8">
              <img src="/icons/quote.svg" alt="" className="w-47.5 h-50" />
            </div>
          </div>

          {/* Darrell Steward */}
          <div className="md:row-start-1 md:col-start-2 bg-[#FFFFFF] rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/darrell-steward.png"
                alt="Darrell Steward"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="text-[#030712] text-sm font-semibold">
                  Darrell Steward
                </p>

                <p className="text-[#3F4555] text-xs">
                  Product Manager, Circle
                </p>
              </div>
            </div>

            <p className="text-sm leading-5 text-[#0F172A]">
              "We use Polio on a daily basis for several internal processes, and
              I cannot rave enough about them."
            </p>
          </div>

          {/* Bessie Cooper */}
          <div className="row-start-4 md:row-start-1 md:row-span-2 bg-[#FFFFFF] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/bessie-cooper.png"
                  alt="Bessie Cooper"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p className="text-[#030712] text-sm font-semibold">
                    Bessie Cooper
                  </p>

                  <p className="text-[#3F4555] text-xs">
                    Product Manager, Circle
                  </p>
                </div>
              </div>

              <p className="text-sm leading-5 text-[#0F172A]">
                "We use Polio on a daily basis for several internal processes,
                and I cannot rave enough about them. Incredible flexibility and
                features combined with super intuitive UI."
              </p>
            </div>

            <div className="flex justify-end mt-8">
              <img src="/icons/quote.svg" alt="" className="w-47.5 h-50" />
            </div>
          </div>

          {/* Kristin Watson */}
          <div className="row-start-3 md:row-start-2 bg-[#FFFFFF] rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/kristin-watson.png"
                alt="Kristin Watson"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="text-[#030712] text-sm font-semibold">
                  Kristin Watson
                </p>

                <p className="text-[#3F4555] text-xs">
                  Product Manager, Circle
                </p>
              </div>
            </div>

            <p className="text-sm leading-5 text-[#0F172A]">
              "We use Polio on a daily basis for several internal processes, and
              I cannot rave enough about them."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
