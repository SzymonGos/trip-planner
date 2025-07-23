'use client';

import React, { useReducer, useCallback } from 'react';
import { AiChatSheet } from './AiChatSheet';
import { chatReducer, initialState } from './helpers/chatReducer';

export const AiChatSheetContainer = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const handleSendMessage = useCallback(async () => {
    if (!state.inputValue.trim() || state.isLoading) return;

    const messageContent = state.inputValue.trim();
    dispatch({ type: 'SEND_MESSAGE', payload: messageContent });

    try {
      const response = await fetch('/api/chat', {
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

  const handleClearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <AiChatSheet
      messages={state.messages}
      inputValue={state.inputValue}
      isLoading={state.isLoading}
      error={state.error}
      onInputChange={handleInputChange}
      onSendMessage={handleSendMessage}
      onKeyPress={handleKeyPress}
      onClearError={handleClearError}
    />
  );
};
