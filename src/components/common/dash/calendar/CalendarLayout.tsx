type CalendarLayoutProps = {
  sidebar: React.ReactNode;
  panel: React.ReactNode;
  detailsPanel?: React.ReactNode;
};

const CalendarLayout = ({
  sidebar,
  panel,
  detailsPanel,
}: CalendarLayoutProps) => {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Sidebar */}
      <div className="w-full lg:w-[478px] flex-shrink-0">{sidebar}</div>

      {/* Main Panel */}
      <div
        className={`
      ${detailsPanel ? "w-full lg:w-[355px] flex-shrink-0" : "flex-1"}
    `}
      >
        {panel}
      </div>

      {/* Details Panel */}
      {detailsPanel && (
        <div className="w-full lg:w-[311px] flex-shrink-0">{detailsPanel}</div>
      )}
    </section>
  );
};

export default CalendarLayout;
