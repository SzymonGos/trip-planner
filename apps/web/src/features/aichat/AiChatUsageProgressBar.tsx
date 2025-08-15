import React, { FC } from 'react';
import cx from 'classnames';
import { USER_AI_CHAT_LIMIT } from './AiChatSheetContainer';

type TAiChatUsageProgressBarProps = {
  currentUsage: number;
  usagePercentage: number;
};

export const AiChatUsageProgressBar: FC<TAiChatUsageProgressBarProps> = ({ currentUsage, usagePercentage }) => (
  <div className={cx('text-xs text-gray-500 flex flex-col items-start mt-4')}>
    <span className="font-medium">
      {currentUsage}/{USER_AI_CHAT_LIMIT} messages
    </span>
    <div className="w-[90px] h-[6px] bg-gray-200 rounded-full mt-1">
      <div
        className={cx('h-[6px] rounded-full transition-all duration-300', {
          'bg-red-500': usagePercentage >= 80,
          'bg-yellow-500': usagePercentage >= 60 && usagePercentage < 80,
          'bg-green-500': usagePercentage < 60,
        })}
        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
      />
    </div>
  </div>
);
