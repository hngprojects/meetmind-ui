type CalendarLayoutProps = {
  sidebar: React.ReactNode;
  panel: React.ReactNode;
};

const CalendarLayout = ({ sidebar, panel }: CalendarLayoutProps) => {
  return (
    <section className="flex gap-8">
      <div className="w-[35%]">{sidebar}</div>

      <div className="w-[65%]">{panel}</div>
    </section>
  );
};

export default CalendarLayout;
