import React, { useState, useEffect } from "react";

function MotivationalQuote() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: {
                "X-Api-Key": process.env.REACT_APP_API_KEY
            }
        });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setQuote(data[0].quote);
            setAuthor(data[0].author);
            // console.log(data[0]);
        } catch (error) {
            console.error("Error fetching the quote:", error);
        }
    };

    useEffect(() => {
      fetchQuote(); // Initial fetch

      const interval = setInterval(() => {
          fetchQuote();
      }, 30000);

      return () => clearInterval(interval);
  }, []);

    return (
        <div>
            <h3>Quote Buddy</h3>
            <p>"{quote}"</p>
            <p>- {author}</p>
        </div>
    );
}

export default MotivationalQuote;

