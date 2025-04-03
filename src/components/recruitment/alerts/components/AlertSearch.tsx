
import React from 'react';

interface AlertSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AlertSearch: React.FC<AlertSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar alertas..."
          className="w-full rounded-md border border-input px-4 py-2 pl-10 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute left-3 top-2.5 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default AlertSearch;
