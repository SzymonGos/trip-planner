'use client';

import React, { useReducer, useCallback } from 'react';
import { AiChatSheet } from './AiChatSheet';
import { chatReducer, initialState } from './helpers/chatReducer';
import { CHAT_API_URL } from '@/lib/config';
import { useAuthenticatedUser } from '../user/hooks/useAuthenticatedUser';

export const AiChatSheetContainer = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { authUserId } = useAuthenticatedUser();

  const handleSendMessage = useCallback(async () => {
    if (!state.inputValue.trim() || state.isLoading) return;

    const messageContent = state.inputValue.trim();
    dispatch({ type: 'SEND_MESSAGE', payload: messageContent });

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ message: messageContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }
      dispatch({ type: 'AI_RESPONSE', payload: data.response });
    } catch (err) {
      console.error('Chat API error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, [state.inputValue, state.isLoading]);

  const handleInputChange = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT', payload: value });
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <AiChatSheet
      messages={state.messages}
      inputValue={state.inputValue}
      isLoading={state.isLoading}
      onInputChange={handleInputChange}
      onSendMessage={handleSendMessage}
      onKeyPress={handleKeyPress}
      authUserId={authUserId}
    />
  );
};
