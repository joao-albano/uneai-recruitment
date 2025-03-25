
import React from 'react';
import SignupFormContainer from './SignupFormContainer';

interface SignupFormProps {
  onSwitchTab: () => void;
  onSuccess: (email: string) => void;
}

const SignupForm = ({ onSwitchTab, onSuccess }: SignupFormProps) => {
  return (
    <SignupFormContainer 
      onSwitchTab={onSwitchTab} 
      onSuccess={onSuccess} 
    />
  );
};

export default SignupForm;
