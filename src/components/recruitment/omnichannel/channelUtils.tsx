
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { ChannelStatus } from './types';

export const getChannelStatusIcon = (status: ChannelStatus) => {
  switch(status) {
    case 'online': 
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'limited': 
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case 'offline': 
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

export const getChannelStatusText = (status: ChannelStatus) => {
  switch(status) {
    case 'online': return 'Online';
    case 'limited': return 'Limitado';
    case 'offline': return 'Offline';
  }
};
