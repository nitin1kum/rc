const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function generateQuestions(topic: string) {
  const res = await fetch(API_URL + "/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  if (!res.ok) throw new Error("Failed to generate questions");
  return await res.json();
}

export async function generateFeedback(score: number, topic: string) {
  const res = await fetch(API_URL + "/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, topic }),
  });

  if (!res.ok) throw new Error("Failed to generate feedback");
  const data = await res.json();
  return data.feedback;
}
