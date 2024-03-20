import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();

  const sendMessage = async ({ content, senderId, chatRoomId }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/message/creat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, senderId, chatRoomId }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      console.log(data, "sent message");
      setMessages([...messages, data.data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
