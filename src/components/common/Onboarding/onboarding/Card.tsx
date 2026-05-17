interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Card = ({ title, description, icon }: CardProps) => (
  <div className="flex flex-col gap-3 p-5 bg-card border border-border rounded-2xl">
    <div className="text-muted-foreground w-6 h-6">{icon}</div>

    <div className="space-y-1">
      <h4 className="font-bold text-foreground text-base">{title}</h4>
      <p className="text-sm text-muted-foreground leading-snug font-medium">
        {description}
      </p>
    </div>
  </div>
);

export default Card;
