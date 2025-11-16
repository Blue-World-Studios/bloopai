async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    addMessage("Bloop", data.reply.content);

  } catch (err) {
    addMessage("Bloop", "AI unavailable (connection error)");
  }
}

function addMessage(sender, text) {
  const box = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "msg";
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

