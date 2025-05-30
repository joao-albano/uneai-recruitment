
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/product';
import RecruitmentScheduleView from '@/components/recruitment/schedule/RecruitmentScheduleView';
import { useSearchParams } from 'react-router-dom';

const RecruitmentSchedulePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  const leadId = searchParams.get('leadId');
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Set the current product to 'recruitment'
  useEffect(() => {
    setCurrentProduct('recruitment');
    console.log('Setting product to recruitment in schedule page');
    
    // If there's an action parameter, expand the sidebar for better context
    if (action) {
      setSidebarCollapsed(false);
      
      // If the action is 'new', show the add dialog
      if (action === 'new') {
        setShowAddDialog(true);
        console.log('Opening new appointment dialog from URL parameter');
        
        if (leadId) {
          console.log(`Lead ID passed: ${leadId}`);
        }
      }
    }
  }, [setCurrentProduct, action, leadId]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="flex-1 p-4 sm:p-6 w-full">
        <RecruitmentScheduleView 
          showAddDialog={showAddDialog}
          setShowAddDialog={setShowAddDialog}
          leadId={leadId}
        />
      </div>
    </Layout>
  );
};

export default RecruitmentSchedulePage;
