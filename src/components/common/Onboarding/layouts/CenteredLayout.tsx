import type React from 'react';

const CenteredLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex items-center justify-center bg-background md:items-start md:justify-start lg:items-center lg:justify-center ">
      <div className="flex flex-col items-center w-full max-w-xl md:max-w-full md:items-start lg:items-center px-6 sm:px-10 md:px-12 lg:px-16 py-8 md:py-12 ">
        {children}
      </div>
    </div>
  );
};

export default CenteredLayout;
