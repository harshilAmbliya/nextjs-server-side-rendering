export async function POST() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();
  return Response.json(data);
}