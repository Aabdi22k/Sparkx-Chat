import React from "react";

const useLastMessage = () => {
  const [lastMessage, setLastMessage] = React.useState('');

  return { lastMessage, setLastMessage };
};

export default useLastMessage;
