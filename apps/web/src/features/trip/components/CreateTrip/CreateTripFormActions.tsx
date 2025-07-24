import { SignInButton } from '@/components/SignIn/SignInButton';
import { Button } from '@/components/ui/button';
import { ResetIcon } from '@/components/Icons/ResetIcon';
import { FC } from 'react';

type TCreateTripFormActionsProps = {
  authUserId: string;
  isSubmitting: boolean;
  isEditing: boolean;
  hasChanges: boolean;
  handleReset: () => void;
};
export const CreateTripFormActions: FC<TCreateTripFormActionsProps> = ({
  authUserId,
  isSubmitting,
  isEditing,
  hasChanges,
  handleReset,
}) => (
  <div className="mt-8 flex gap-4">
    {!authUserId && <SignInButton />}
    {authUserId && (
      <>
        <Button type="submit" className="min-w-[200px]" disabled={isSubmitting || (isEditing && !hasChanges)}>
          {isEditing ? 'Update Trip' : 'Create Trip'}
        </Button>
        {!isEditing && (
          <Button type="button" variant="outline" onClick={handleReset}>
            <ResetIcon />
          </Button>
        )}
      </>
    )}
  </div>
);
