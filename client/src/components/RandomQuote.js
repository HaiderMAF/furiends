import React, { useState, useEffect } from "react";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");

  // Array of inspirational dog quotes
  const quotes = [
    "Chase your dreams with the heart of a pup, and you'll fetch success every time.",
    "In a world full of bones, be someone's wagging tail.",
    "Bark less, wag more. It's the tail-wagging way to happiness.",
    "Embrace the simple joys of life: a warm sunbeam, a wagging tail, and a loyal friend by your side.",
    "Leave a little sparkle wherever you go, just like the joyous trail of a wagging tail.",
    "Life's a ball game, and every day is a chance to catch your dreams.",
    "In a world full of sticks, be the wagging tail that brings them together.",
    "Wag your way through challenges, and watch them turn into tail-wagging triumphs.",
    "When life throws you a bone, bury it for later – tomorrow's adventures await."
  ];

  useEffect(() => {
    // Function to update quote every 10 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="random-quote">
      <p>"{quote}"</p>
    </div>
  );
};

export default RandomQuote;