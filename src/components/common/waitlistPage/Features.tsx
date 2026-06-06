const Features = () => {
  const features = [
    {
      title: "Context-aware AI",
      desc: "Inject agendas, resumes, scorecards, and structured data before every session.",
    },
    {
      title: "Developer SDK",
      desc: "Integrate MeetMind into your own product with APIs and adapters.",
    },
    {
      title: "Voice participation",
      desc: "AI listens, waits for natural pauses, and responds in real time.",
    },
    {
      title: "Natural language queries",
      desc: "Ask questions about meetings without scrolling through transcripts.",
    },
  ];

  return (
    <section className=" w-full px-6 lg:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Built for real-time participation.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-10 border border-neutral-100 rounded-3xl
             bg-white hover:shadow-sm transition-shadow"
          >
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-neutral-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
