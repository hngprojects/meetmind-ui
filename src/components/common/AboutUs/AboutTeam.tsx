import Image from "next/image";
import { teamMembers } from "./data";

function TeamCard({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <article className="flex flex-col shrink-0 w-[85%] sm:w-[70%] md:w-auto snap-center">
      <div className="relative w-full aspect-[4/3] rounded-[0.75rem] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-[center_20%]"
          sizes="(max-width: 768px) 85vw, 25vw"
        />
      </div>
      <p className="mt-[0.75rem] text-[0.6875rem] font-semibold tracking-[0.06em] uppercase text-text-primary">
        {member.role}
      </p>
      <h3 className="mt-[0.25rem] text-[1rem] font-bold text-text-color-primary">
        {member.name}
      </h3>
      <p className="mt-[0.375rem] text-[0.8125rem] leading-[1.5] text-text-body">
        {member.bio}
      </p>
    </article>
  );
}

export default function AboutTeam() {
  return (
    <section className="bg-bg-primary py-[3rem] md:py-[4rem]">
      <div className="max-w-[80rem] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-[5rem]">
        <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-text-color-primary">
          Our Dedicated Team
        </h2>

        {/* Mobile / tablet: horizontal scroll */}
        <div className="mt-[1.5rem] lg:hidden -mx-[1.5rem] px-[1.5rem]">
          <div className="flex gap-[1rem] overflow-x-auto snap-x snap-mandatory pb-[0.5rem] scrollbar-thin">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="mt-[2rem] hidden lg:grid lg:grid-cols-4 lg:gap-[1.5rem]">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
