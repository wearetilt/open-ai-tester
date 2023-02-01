'use client'
import { createContext, useEffect, useState } from 'react'
import { Inter } from '@next/font/google'
import styles from './page.module.css'


export default function Home() {

  const [prompt, setPrompt] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [response, setResponse] = useState("");

const getResponseFromOpenAI = async () => {
  setResponse("");
  console.log("Getting response from OpenAI...");
  setIsLoading(true);
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  });

  const data = await response.json();
  setIsLoading(false);
  console.log(data.text);
  setResponse(data.text);
};

  return (
    <main className={styles.main}>
    <div className={styles.description}>
      <h1 className={styles.title}>Ask Tilt AI a question...</h1>
    </div>

    <div className={styles.center}>
      <textarea
        className={styles.promptInput}
        placeholder="Enter a prompt"
        onChange={(e) => setPrompt(e.target.value)}
        row="5"
        cols="50"
      />
      <button className={styles.button} onClick={getResponseFromOpenAI}>
        Ask your question
      </button>

      <div className={styles.response}>
        {isLoading ? (
          <div>Accessing the Tiltorithm</div>
        ) : (
          <div>{response}</div>
        )}
      </div>
    </div>
  </main>
  )
}
