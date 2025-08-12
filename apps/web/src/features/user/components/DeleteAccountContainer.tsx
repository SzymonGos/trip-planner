import React, { useState } from 'react';
import { DeleteAccount } from './DeleteAccount';

export const DeleteAccountContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAccount = async () => {
    // TODO: Implement account deletion logic
    console.log('Deleting account...');
    setIsOpen(false);
  };

  return <DeleteAccount isOpen={isOpen} setIsOpen={setIsOpen} handleDeleteAccount={handleDeleteAccount} />;
};
