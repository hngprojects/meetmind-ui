type CalendarLayoutProps = {
  sidebar: React.ReactNode;
  panel: React.ReactNode;
};

const CalendarLayout = ({ sidebar, panel }: CalendarLayoutProps) => {
  return (
    <section className="flex items-start gap-6">
      {/* Left Sidebar */}
      <div className="w-[478px] flex-shrink-0">{sidebar}</div>

      {/* Right Panel */}
      <div className="flex-1">{panel}</div>
    </section>
  );
};

export default CalendarLayout;
