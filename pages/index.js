import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [formCharCount, setFormCharCount] = useState("0")
  const [result, setResult] = useState("");
  const [img, setImg] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      if (data.result[0] === "F") {
        setResult("False.")
      } else if (data.result[0] === "T") {
        setResult("True.")
      } else {
        setResult("I Don't Know.")
      }
      setQuestionInput("");
      setFormCharCount("0");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function formFunction(e) {
    setQuestionInput(e.target.value)
    setFormCharCount(e.target.value.length.toString())
    if (Number(formCharCount) > 1) {
      setResult("")
      setImg("")
    }
  }

  useEffect(() => {
    if (result === "True.") {
      setImg("/true.png");
    } else if (result === "False.") {
      setImg("/falsey.png");
    } else if (result === "I Don't Know.") {
      setImg("/pngwing.png");
    }
  }, [result]);

  return (
    <div style={{ width: "100%", height: "97vh", backgroundColor: "#353740" }}>
      <Head>
        <title>AI True or False</title>
        <link rel="icon" href="/pngegg.png" />
      </Head>

      <main className={styles.main}>
        <img src="/pngegg.png" className={styles.icon} />
        <h1 style={{ color: "white" }}>Candid AI</h1>
        <span style={{ color: "white", fontSize: "11px", fontStyle: "italic" }}>True, False, or I Dont Know.</span>
        <p style={{ color: "white" }}>Powered by OpenAI</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            maxLength={50}
            placeholder="ex. the sky is blue"
            value={questionInput}
            onChange={(e) => formFunction(e)}
          />
          <p className={styles.counter}>{formCharCount}/50</p>
          <input type="submit" value="Generate Answer" />
        </form>
        <h2 className={styles.result}>{result}</h2>
        <div>{img && <img style={{ width: 100, height: 100 }} src={img} alt={result} />}</div>
      </main>
    </div>
  );
}