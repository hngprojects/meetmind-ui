const AuthDivider = () => {
  return (
    <div className="my-8 flex items-center gap-4">
      <span className="h-px w-full bg-bg-divider"></span>
      <span className="text-sm font-semibold text-text-divider whitespace-nowrap">
        OR
      </span>
      <span className="h-px w-full bg-bg-divider"></span>
    </div>
  );
};

export default AuthDivider;
