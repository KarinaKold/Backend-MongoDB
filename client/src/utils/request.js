export async function request(path, method, data) {
  const res = await fetch("/api" + path, {
    headers: {
      "Content-type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
  });
  return await res.json();
}
