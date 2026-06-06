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
    <section className="flex flex-col px-4 py-6 gap-6 lg:gap-10 lg:py-10 lg:px-16 lg:flex-row lg:items-start">
      {/* Sidebar */}
      <div className="mx-auto w-full max-w-[478px] lg:flex-shrink-0">
        {sidebar}
      </div>

      {/* Main Panel */}
      <div
        className={
          detailsPanel ? "w-full lg:w-[355px] flex-shrink-0" : "flex-1"
        }
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
