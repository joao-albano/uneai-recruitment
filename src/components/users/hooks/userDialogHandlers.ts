
import { UserType } from '../types';

export const useUserDialogHandlers = (
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleOpenEditDialog = (user: UserType) => {
    // First set the selected user, then open the dialog
    if (user) {
      // Make a deep clone to avoid reference issues
      const userClone = structuredClone(user);
      
      // Set the selected user first, then open the dialog
      setSelectedUser(userClone);
      
      // Use setTimeout to ensure the user is set before opening the dialog
      setTimeout(() => {
        setShowEditDialog(true);
      }, 0);
    } else {
      console.error("Attempted to edit an undefined user");
    }
  };
  
  const handleOpenDeleteDialog = (user: UserType) => {
    // First set the selected user, then open the dialog
    if (user) {
      // Make a deep clone to avoid reference issues
      const userClone = structuredClone(user);
      
      setSelectedUser(userClone);
      
      // Use setTimeout to ensure the user is set before opening the dialog
      setTimeout(() => {
        setShowDeleteDialog(true);
      }, 0);
    } else {
      console.error("Attempted to delete an undefined user");
    }
  };
  
  return {
    handleOpenEditDialog,
    handleOpenDeleteDialog
  };
};
