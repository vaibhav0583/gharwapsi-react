import { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const MOCK_RESPONSES = [
  "That sounds wonderful! 🏔️ Based on your interest, I'd recommend the Negi family in Devprayag, Uttarakhand — a river-side farming family with a 4.98 rating. Crowd level there is 🟢 LOW right now, perfect timing!",
  "Great choice! 🎨 For an artisan experience, the Meena family in Sawai Madhopur are 5th-generation potters. You'd wake up to clay and colour every morning. Shall I check their availability?",
  "I love that vibe! 🌿 The Varghese family in Wayanad, Kerala run a spice and coffee plantation. Mornings start with harvest, evenings with Ayurvedic cooking. One of our most loved stays!",
  "Based on what you've shared, I found 3 perfect family matches for you! Would you like to take our quick 2-minute vibe quiz for an even more accurate match? 🧠"
];

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! 🙏 I\'m your GharWapsi travel assistant. Tell me about your dream Indian experience and I\'ll find the perfect family for you!', time: 'Just now' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const send = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', text: userText, time: getTime() }]);
    setLoading(true);

    // --- SWAP THIS WITH REAL API CALL ---
    // const res = await fetch('/api/ai/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: userText })
    // });
    // const data = await res.json();
    // const aiText = data.reply;
    // ------------------------------------

    await new Promise(r => setTimeout(r, 1200));
    const aiText = MOCK_RESPONSES[count % MOCK_RESPONSES.length];
    setCount(c => c + 1);

    setLoading(false);
    setMessages(prev => [...prev, { role: 'ai', text: aiText, time: getTime() }]);
  };

  return (
    <div className="chat-demo reveal">
      <div className="chat-header">
        <div className="chat-avatar">🤖</div>
        <div className="chat-info">
          <div className="chat-name">GharWapsi AI Assistant</div>
          <div className="chat-status">
            <span className="status-dot"></span> Online · Replies instantly
          </div>
        </div>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`msg msg-${msg.role}`}>
            <div className="msg-bubble">{msg.text}</div>
            <div className="msg-time">{msg.time}</div>
          </div>
        ))}
        {loading && (
          <div className="msg msg-ai">
            <div className="msg-bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-wrap">
        <input
          className="chat-input"
          type="text"
          placeholder="e.g. I want a quiet hill family experience..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button className="chat-send" onClick={send}>→</button>
      </div>
    </div>
  );
}
