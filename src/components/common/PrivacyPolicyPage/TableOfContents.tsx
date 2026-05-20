"use client";

import { useState, useEffect, useRef, type MouseEvent } from "react";

interface ToCItem {
  id: string;
  label: string;
}

const items: ToCItem[] = [
  { id: "introduction", label: "Introduction" },
  { id: "information-collection", label: "Information Collection" },
  { id: "use-of-information", label: "Use of Information" },
  { id: "information-disclosure", label: "Information Disclosure" },
  { id: "data-security", label: "Data Security" },
  { id: "changes-to-policy", label: "Changes to This Policy" },
];

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(items[0].id);
  
  // Guard ref to prevent the IntersectionObserver from updating active state during a programmatic click scroll
  const isClickScrolling = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Click handler: scrolls smoothly and silently pushes the state hash
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
      isClickScrolling.current = true;
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
      
      element.scrollIntoView({ behavior: "smooth" });

      // Clear any previous timeout if user clicks rapidly
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

      // Re-enable observer tracking after the smooth scroll finishes (approx 800ms)
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    }
  };

  // Scroll Spy: dynamically highlights active section as the user scrolls
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -60% 0px", // Optimizes top/bottom boundaries for mid-sized viewport scanning
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // If the movement was triggered by a link click, ignore updates to prevent flickering
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // Mounting listener: handles shareable anchor hashes directly on visit
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Delayed slight timeout ensures Next.js hydration and DOM paint has completed 
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveId(id);
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-6">
      <h3 className="font-bold text-[#3F4555] mb-6 text-xl">Contents</h3>
      <ul className="space-y-5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="relative flex items-center">
              {isActive && (
                <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#0A4C57] transition-all duration-200" />
              )}
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`text-sm transition-colors duration-200 pl-4 block w-full ${
                  isActive
                    ? "text-[#0A4C57] font-semibold"
                    : "text-[#3F4555] hover:text-gray-900 font-normal"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}