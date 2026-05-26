type StatCardProps = {
  label: string;
  value: number;
  valueClassName?: string;
};

const StatCard = ({ label, value, valueClassName }: StatCardProps) => {
  return (
    <div className="p-6 flex-1 flex flex-col justify-between items-start gap-2">
      <p className="text-[18px] font-normal text-text-secondary">{label}</p>

      <p className={`text-4xl font-semibold ${valueClassName ?? ""}`}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;
