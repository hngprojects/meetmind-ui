type CalendarLayoutProps = {
  sidebar: React.ReactNode;
  panel: React.ReactNode;
};

const CalendarLayout = ({ sidebar, panel }: CalendarLayoutProps) => {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Left Sidebar */}
      <div className="w-full lg:w-[478px] flex-shrink-0">{sidebar}</div>

      {/* Right Panel */}
      <div className="flex-1">{panel}</div>
    </section>
  );
};

export default CalendarLayout;
