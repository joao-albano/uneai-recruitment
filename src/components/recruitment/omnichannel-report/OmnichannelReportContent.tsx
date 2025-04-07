
import React, { useState } from 'react';
import OmnichannelOverview from './OmnichannelOverview';
import { omnichannelReportData } from './data/omnichannelReportData';
import OmnichannelReportHeader from './components/OmnichannelReportHeader';
import DateRangeSelector from './components/DateRangeSelector';
import OmnichannelReportTabs from './components/OmnichannelReportTabs';

const OmnichannelReportContent: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <OmnichannelReportHeader
          title="Relatório Omnichannel"
          subtitle="Análise completa dos atendimentos realizados por todos os canais"
        />
        
        <DateRangeSelector 
          dateRange={dateRange} 
          setDateRange={setDateRange} 
        />
      </div>

      <OmnichannelOverview data={omnichannelReportData} dateRange={dateRange} />
      
      <OmnichannelReportTabs 
        data={omnichannelReportData} 
        dateRange={dateRange} 
      />
    </div>
  );
};

export default OmnichannelReportContent;
