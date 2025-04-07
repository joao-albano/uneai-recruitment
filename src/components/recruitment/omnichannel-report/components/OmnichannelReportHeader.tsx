
import React from 'react';

interface OmnichannelReportHeaderProps {
  title: string;
  subtitle: string;
}

const OmnichannelReportHeader: React.FC<OmnichannelReportHeaderProps> = ({
  title,
  subtitle
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
};

export default OmnichannelReportHeader;
