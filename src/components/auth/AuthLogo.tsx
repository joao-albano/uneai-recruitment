
import React from 'react';

const AuthLogo = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10 mb-4">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="text-lg font-semibold">U</span>
        </div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl font-bold">Une.AI</span>
          <span className="text-2xl font-light">EduCare</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Sistema de prevenção à evasão escolar
        </p>
      </div>
    </div>
  );
};

export default AuthLogo;
