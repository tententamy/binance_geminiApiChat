import fetch from "node-fetch";

const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.GEMINI_API_KEY
  },
  body: JSON.stringify({
    contents: [{ role: "user", parts: [{ text: "Hello from Node!" }] }]
  })
});

console.log(await resp.json());
