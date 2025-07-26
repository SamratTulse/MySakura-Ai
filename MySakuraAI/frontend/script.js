const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');

function sendMessage() {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  chatBox.innerHTML += `<div><b>You:</b> ${userMsg}</div>`;
  input.value = '';

  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMsg, userId: 'user1' })
  })
  .then(res => res.json())
  .then(data => {
    chatBox.innerHTML += `<div><b>MySakura AI:</b> ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
