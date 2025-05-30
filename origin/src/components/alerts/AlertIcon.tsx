
import React from 'react';
import { AlertTriangle, BookOpen, Calendar, UserPlus, LineChart, BarChart3, UserCheck } from 'lucide-react';

type AlertIconProps = {
  type: string;
  className?: string;
};

export const getAlertBgColor = (type: string) => {
  switch(type) {
    case 'high-risk':
      return 'bg-red-100';
    case 'medium-risk':
      return 'bg-yellow-100';
    case 'low-risk':
      return 'bg-blue-100';
    case 'survey-requested':
      return 'bg-purple-100';
    case 'meeting-scheduled':
      return 'bg-green-100';
    case 'lead-opportunity':
      return 'bg-green-100';
    case 'stage-change':
      return 'bg-blue-100';
    case 'campaign-performance':
      return 'bg-purple-100';
    case 'lead-assigned':
      return 'bg-amber-100';
    default:
      return 'bg-gray-100';
  }
};

const AlertIcon: React.FC<AlertIconProps> = ({ type, className = "h-5 w-5" }) => {
  switch(type) {
    case 'high-risk':
      return <AlertTriangle className={`${className} text-red-500`} />;
    case 'medium-risk':
      return <AlertTriangle className={`${className} text-yellow-500`} />;
    case 'low-risk':
      return <BookOpen className={`${className} text-blue-500`} />;
    case 'survey-requested':
      return <BookOpen className={`${className} text-purple-500`} />;
    case 'meeting-scheduled':
      return <Calendar className={`${className} text-green-500`} />;
    case 'lead-opportunity':
      return <UserPlus className={`${className} text-green-500`} />;
    case 'stage-change':
      return <LineChart className={`${className} text-blue-500`} />;
    case 'campaign-performance':
      return <BarChart3 className={`${className} text-purple-500`} />;
    case 'lead-assigned':
      return <UserCheck className={`${className} text-amber-500`} />;
    default:
      return <AlertTriangle className={className} />;
  }
};

export default AlertIcon;
