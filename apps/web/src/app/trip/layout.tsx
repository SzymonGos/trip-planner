import React, { ReactNode } from 'react';
import { TripPageLayoutContainer } from '@/features/trip/TripPageLayoutContainer';
import { AiChatSheetContainer } from '@/features/aichat/AiChatSheetContainer';

const TripPageLayout = ({ children }: { children: ReactNode }) => (
  <>
    <TripPageLayoutContainer>{children}</TripPageLayoutContainer>
    <AiChatSheetContainer />
  </>
);
export default TripPageLayout;
