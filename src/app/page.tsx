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
  setResponse(data.image);
};

  return (
    <main className={styles.main}>
    <div className={styles.description}>
      <h1 className={styles.title}>Tilt AI image generation</h1>
      <p className={styles.text}>Type in a prompt and the Tilt AI will generate you a personalised image.</p>
    </div>

    <div className={styles.center}>
      <textarea
        className={styles.promptInput}
        placeholder="Enter a prompt"
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        cols={50}
      />
      <button className={styles.button} onClick={getResponseFromOpenAI}>
    Generate your image
      </button>

      <div className={styles.response}>
        {isLoading ? (
          <div>Accessing the Tiltorithm</div>
        ) : (
          <div><img className={styles.imageOutput} src={response}/></div>
        )}
      </div>
    </div>
  </main>
  )
}
