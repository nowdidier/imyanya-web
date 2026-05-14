import React from 'react';
import { AUTH_CONFIG, HOST_NAME, getCanonicalHostName } from './configs/constants';
import { useSelector } from 'react-redux';

// Defined outside the component — stable reference, no re-creation on render
const BOT_CONFIG_BY_HOST = {
  [HOST_NAME.MYJOB]: AUTH_CONFIG.JOB_SEEKER_BOT,
  [HOST_NAME.EMPLOYER_MYJOB]: AUTH_CONFIG.EMPLOYER_BOT,
};

export const MyJobChatBot = () => {
  const hostName = getCanonicalHostName(window.location.hostname);
  const { isAuthenticated } = useSelector((state) => state.user);

  const chatbotConfig = BOT_CONFIG_BY_HOST[hostName];

  // Don't render if config is missing or user isn't logged in
  if (!chatbotConfig?.AGENT_ID || !isAuthenticated) return null;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <df-messenger
            intent="WELCOME"
            chat-title="${chatbotConfig.CHAT_TITLE}"
            agent-id="${chatbotConfig.AGENT_ID}"
            language-code="en"
            chat-icon="${chatbotConfig.CHAT_ICON}"
          ></df-messenger>
        `,
      }}
    />
  );
};