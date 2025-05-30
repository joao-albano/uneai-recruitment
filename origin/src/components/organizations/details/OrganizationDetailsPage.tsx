
import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrganizationDetails } from './hooks/useOrganizationDetails';
import OrganizationDetailsLoading from './OrganizationDetailsLoading';
import OrganizationNotFound from './OrganizationNotFound';
import OrganizationDetailsHeader from './OrganizationDetailsHeader';
import OrganizationMetadata from './OrganizationMetadata';
import OrganizationDetailCards from './OrganizationDetailCards';

const OrganizationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { organization, isLoading } = useOrganizationDetails(id);
  
  if (isLoading) {
    return <OrganizationDetailsLoading />;
  }
  
  if (!organization) {
    return <OrganizationNotFound />;
  }
  
  return (
    <div className="p-8 space-y-6">
      <OrganizationDetailsHeader organization={organization} />
      <OrganizationMetadata createdAt={organization.createdAt} />
      <OrganizationDetailCards 
        organizationId={organization.id} 
        products={organization.products || []} 
      />
    </div>
  );
};

export default OrganizationDetailsPage;
