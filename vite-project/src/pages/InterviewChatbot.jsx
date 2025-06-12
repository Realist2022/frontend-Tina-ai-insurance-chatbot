import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./InterviewChatbot.module.css";
import ReactMarkdown from "react-markdown"; 


const API_BASE_URL = "http://localhost:3000";

function InterviewChatbot() {
  const [sessionId, setSessionId] = useState("");
  const [conversation, setConversation] = useState([]);
  const [userResponse, setUserResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generates a new session ID when the component mounts
  useEffect(() => {
    setSessionId(Date.now().toString());
  }, []);

  // Function to call the API
  const callApi = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, payload);
      setConversation(response.data.history);
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const startInterview = async () => {
    setConversation([]);
    setUserResponse("");
    // The URL context is now handled by the backend, so we don't pass a URL here.
    await callApi({ sessionId, userResponse: "start interview" });
  };

  const handleSubmitResponse = async () => {
    if (!userResponse.trim()) {
      setError("Please enter your response.");
      return;
    }
    const newUserMessage = { role: "user", text: userResponse };
    setConversation(prev => [...prev, newUserMessage]);
    const currentResponse = userResponse;
    setUserResponse("");
    // The URL context is handled by the backend
    await callApi({ sessionId, userResponse: currentResponse });
  };

  return (
    <div className={styles.InterviewChatbot}>
      <h1>Insurance Policy</h1>
      <h3>Tina Turner Helperminator</h3>
      <button onClick={startInterview} disabled={isLoading}>
        Start Interview
      </button>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.conversationArea}>
        {conversation.map((msg, index) => (
          <p key={index}>
            <strong>
              {msg.role === "user" ? "You:" : "Tina:"}
            </strong>{" "}
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </p>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>

      <textarea
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
        placeholder="Enter your response"
        rows="3"
        disabled={isLoading || conversation.length === 0}
      />
      <button
        onClick={handleSubmitResponse}
        disabled={isLoading || !userResponse.trim() || conversation.length === 0}
      >
        Submit Response
      </button>
    </div>
  );
}

export default InterviewChatbot;