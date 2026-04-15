/**
 * PureSmile Dental Clinic — AI Chat Widget
 * Add to your pages just before </body>:
 *
 *   <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
 *   <script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
 *   <script src="/puresmile-widget.js"></script>
 */

(function () {
  // ─── CONFIG ───────────────────────────────────────────────────────────────
  const WORKER_URL = 'https://puresmile-workder.mail-rkjw.workers.dev/';
  const BRAND      = '#000E24';   // primary: rgb(0, 14, 36)
  const BRAND_D    = '#000918';   // darker hover state
  const ACCENT     = '#8C4F10';   // secondary: rgb(140, 79, 16)
  const ACCENT_D   = '#6e3d0c';   // darker accent for hover

  // Hardcoded chips for the opening welcome message
  const WELCOME_CHIPS = ['Book an appointment', 'Our services', 'Pricing'];
  // ──────────────────────────────────────────────────────────────────────────

  const messages = [];

  // ── Styles ────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #ps-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9998;
      width: 56px; height: 56px; border-radius: 50%;
      background: ${BRAND}; border: none; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,14,36,0.40);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.2s;
      position: fixed;
    }
    #ps-btn:hover { background: ${BRAND_D}; transform: scale(1.06); }
    #ps-btn svg { width: 26px; height: 26px; fill: #fff; }

    #ps-panel {
      position: fixed; bottom: 90px; right: 24px; z-index: 9999;
      width: 340px; max-height: 520px;
      background: #fff; border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.14);
      display: flex; flex-direction: column;
      overflow: hidden; font-family: 'Instrument Sans', system-ui, sans-serif;
      transform: scale(0.92) translateY(12px); opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    #ps-panel.open {
      opacity: 1; transform: scale(1) translateY(0); pointer-events: all;
    }

    #ps-header {
      background: ${BRAND}; color: #fff;
      padding: 14px 16px; display: flex; align-items: center; gap: 10px;
      flex-shrink: 0;
    }
    #ps-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.12);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; overflow: hidden;
    }
    #ps-header-text { flex: 1; }
    #ps-name { font-size: 14px; font-weight: 600; margin: 0; }
    #ps-status {
      font-size: 11px; opacity: 0.8; margin: 0;
      display: flex; align-items: center; gap: 4px;
    }
    #ps-status::before {
      content: ''; display: inline-block;
      width: 7px; height: 7px; border-radius: 50%; background: #7fe8c8;
    }
    #ps-close {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 28px; line-height: 1; padding: 8px; opacity: 0.8;
    }
    #ps-close:hover { opacity: 1; }

    #ps-messages {
      flex: 1; min-height: 0; overflow-y: auto; padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px;
    }
    #ps-messages::-webkit-scrollbar { width: 4px; }
    #ps-messages::-webkit-scrollbar-thumb { background: #c8d0d8; border-radius: 4px; }

    .ps-msg {
      max-width: 82%; font-size: 13.5px; line-height: 1.5;
      padding: 9px 13px; border-radius: 14px; word-wrap: break-word;
    }
    .ps-msg.bot {
      background: #f0f2f5; color: #1a2030;
      border-bottom-left-radius: 4px; align-self: flex-start;
    }
    .ps-msg.bot p { margin: 0 0 6px; }
    .ps-msg.bot p:last-child { margin-bottom: 0; }
    .ps-msg.bot ul, .ps-msg.bot ol { margin: 4px 0; padding-left: 16px; }
    .ps-msg.bot li { margin-bottom: 2px; }
    .ps-msg.bot code { background: #e2e6ec; padding: 1px 5px; border-radius: 4px; font-size: 12px; }
    .ps-msg.user {
      background: ${BRAND}; color: #fff;
      border-bottom-right-radius: 4px; align-self: flex-end;
    }

    /* Quick reply chips */
    .ps-chips {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 0 0 4px 0; align-self: flex-start;
      max-width: 100%;
    }
    .ps-chip {
      background: #fff; color: ${BRAND};
      border: 1.5px solid ${BRAND}; border-radius: 20px;
      padding: 5px 12px; font-size: 12.5px; font-family: inherit;
      cursor: pointer; white-space: nowrap;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .ps-chip:hover {
      background: ${ACCENT}; color: #fff; border-color: ${ACCENT};
    }

    .ps-typing {
      display: flex; gap: 4px; align-items: center;
      padding: 10px 14px; align-self: flex-start;
    }
    .ps-typing span {
      width: 7px; height: 7px; border-radius: 50%; background: #a0aab8;
      animation: ps-bounce 1.2s infinite;
    }
    .ps-typing span:nth-child(2) { animation-delay: 0.2s; }
    .ps-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ps-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }

    #ps-input-row {
      display: flex; gap: 8px; padding: 12px 14px;
      border-top: 1px solid #e8eaed; flex-shrink: 0;
    }
    #ps-input {
      flex: 1; border: 1px solid #ccd0d8; border-radius: 10px;
      padding: 8px 12px; font-size: 13px; font-family: inherit;
      outline: none; resize: none; max-height: 80px; overflow-y: auto;
      color: #1a2030; transition: border-color 0.15s;
    }
    #ps-input:focus { border-color: ${BRAND}; }
    #ps-input::placeholder { color: #9aa0ac; }
    #ps-send {
      width: 44px; height: 44px; border-radius: 10px; border: none;
      background: ${BRAND}; color: #fff; cursor: pointer; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      align-self: flex-end; transition: background 0.15s;
    }
    #ps-send:hover { background: ${ACCENT}; }
    #ps-send svg { width: 20px; height: 20px; fill: #fff; }

    .ps-notice {
      font-size: 10px; color: #9aa0ac; text-align: center;
      padding: 4px 12px; line-height: 1.4; align-self: center;
    }

    #ps-sparkle {
      position: absolute; top: -4px; right: -4px;
      width: 16px; height: 16px; border-radius: 50%;
      background: ${ACCENT}; color: #fff; font-size: 10px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.22);
      animation: ps-sparkle-pulse 2.4s ease-in-out infinite;
      pointer-events: none; line-height: 1;
    }
    @keyframes ps-sparkle-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      40%       { transform: scale(1.2); opacity: 0.85; }
      70%       { transform: scale(0.95); opacity: 1; }
    }

    @media (max-width: 600px) {
      #ps-panel {
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100vw; border-radius: 0; max-height: none;
        transform: none; transition: opacity 0.25s ease;
      }
      #ps-panel.open { transform: none; }
      #ps-btn { right: 16px; bottom: 16px; }
      #ps-btn.ps-hidden { opacity: 0; pointer-events: none; }
    }
  `;
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', `
    <button id="ps-btn" aria-label="Chat with PureSmile Assistant" style="position:fixed;">
      <span id="ps-sparkle">✦</span>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    </button>

    <div id="ps-panel" role="dialog" aria-label="Chat with PureSmile Assistant">
      <div id="ps-header">
        <div id="ps-avatar">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.15)"/>
            <text x="9" y="23" font-family="Georgia, serif" font-size="20" font-style="italic" font-weight="700" fill="#ffffff">P</text>
          </svg>
        </div>
        <div id="ps-header-text">
          <p id="ps-name">PureSmile <span style="background:rgba(255,255,255,0.18);font-size:9px;padding:2px 7px;border-radius:20px;font-weight:500;letter-spacing:0.05em;vertical-align:middle;">AI</span></p>
          <p id="ps-status">Online — Dental Clinic, Chandigarh</p>
        </div>
        <button id="ps-close" aria-label="Close chat">×</button>
      </div>

      <div id="ps-messages" aria-live="polite"></div>

      <div id="ps-input-row">
        <textarea id="ps-input" placeholder="Ask me anything…" rows="1" aria-label="Your message"></textarea>
        <button id="ps-send" tabindex="-1" aria-label="Send">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `);

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const btn      = document.getElementById('ps-btn');
  const panel    = document.getElementById('ps-panel');
  const closeBtn = document.getElementById('ps-close');
  const msgBox   = document.getElementById('ps-messages');
  const input    = document.getElementById('ps-input');
  const sendBtn  = document.getElementById('ps-send');

  // Mobile keyboard resize
  if (window.visualViewport) {
    const syncHeight = () => {
      if (window.innerWidth <= 600) {
        panel.style.height = window.visualViewport.height + 'px';
        panel.style.top = window.visualViewport.offsetTop + 'px';
        setTimeout(scrollBottom, 100);
      }
    };
    window.visualViewport.addEventListener('resize', syncHeight);
    window.visualViewport.addEventListener('scroll', syncHeight);
  }

  // ── Open / close ──────────────────────────────────────────────────────────
  let opened = false;

  function openPanel() {
    panel.classList.add('open');
    if (window.innerWidth <= 600) {
      btn.classList.add('ps-hidden');
      document.body.style.overflow = 'hidden';
    }
    input.focus();
    setTimeout(() => input.scrollIntoView({ block: 'nearest' }), 300);
    if (!opened) {
      opened = true;
      addNotice("Chats may be reviewed to help us improve.");
      addBotMsg(
        "Hi! I'm the PureSmile AI assistant 👋 I can help with our services, pricing, or booking an appointment. What can I help you with today?",
        WELCOME_CHIPS
      );
    }
  }

  function closePanel() {
    panel.classList.remove('open');
    btn.classList.remove('ps-hidden');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
  closeBtn.addEventListener('click', closePanel);

  // ── Chip parser ───────────────────────────────────────────────────────────
  // Strips <!--replies:...--> from text, returns { cleanText, chips[] }
  function parseReplies(text) {
    const match = text.match(/<!--replies:(.*?)-->/);
    if (!match) return { cleanText: text, chips: [] };
    const chips = match[1].split('|').map(s => s.trim()).filter(Boolean).slice(0, 3);
    const cleanText = text.replace(/<!--replies:.*?-->/, '').trimEnd();
    return { cleanText, chips };
  }

  // ── Messaging ─────────────────────────────────────────────────────────────
  function addNotice(text) {
    const el = document.createElement('div');
    el.className = 'ps-notice';
    el.textContent = text;
    msgBox.appendChild(el);
    scrollBottom();
  }

  function addBotMsg(rawText, forcedChips) {
    const { cleanText, chips } = parseReplies(rawText);
    const finalChips = forcedChips || chips;

    const el = document.createElement('div');
    el.className = 'ps-msg bot';
    el.innerHTML = DOMPurify.sanitize(marked.parse(cleanText));
    msgBox.appendChild(el);

    if (finalChips && finalChips.length > 0) {
      addChips(finalChips);
    }

    scrollBottom();
  }

  function addChips(chips) {
    const row = document.createElement('div');
    row.className = 'ps-chips';

    chips.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'ps-chip';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        // Remove all current chips from the message list
        document.querySelectorAll('.ps-chips').forEach(el => el.remove());
        sendText(label);
      });
      row.appendChild(btn);
    });

    msgBox.appendChild(row);
  }

  function addUserMsg(text) {
    const el = document.createElement('div');
    el.className = 'ps-msg user';
    el.textContent = text;
    msgBox.appendChild(el);
    scrollBottom();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'ps-typing';
    el.id = 'ps-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgBox.appendChild(el);
    scrollBottom();
    return el;
  }

  function removeTyping() {
    document.getElementById('ps-typing')?.remove();
  }

  function scrollBottom() {
    const last = msgBox.lastElementChild;
    if (last) last.scrollIntoView({ block: 'end' });
  }

  // ── Send logic ────────────────────────────────────────────────────────────
  async function sendText(text) {
    if (!text) return;

    // Remove any remaining chips when user sends a message
    document.querySelectorAll('.ps-chips').forEach(el => el.remove());

    input.value = '';
    input.style.height = 'auto';
    sendBtn.style.opacity = '0.5';
    sendBtn.style.pointerEvents = 'none';

    addUserMsg(text);
    messages.push({ role: 'user', content: text });
    showTyping();

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      const data = await res.json();
      removeTyping();

      const reply = data.reply || "Sorry, I couldn't get a response. Please try again.";
      messages.push({ role: 'assistant', content: reply });
      addBotMsg(reply);

    } catch {
      removeTyping();
      addBotMsg("Oops — something went wrong. Please try again in a moment.");
    }

    sendBtn.style.opacity = '1';
    sendBtn.style.pointerEvents = 'auto';
    input.focus();
  }

  async function send() {
    const text = input.value.trim();
    if (!text) return;
    await sendText(text);
  }

  // ── Input handling ────────────────────────────────────────────────────────
  sendBtn.addEventListener('click', send);
  sendBtn.addEventListener('mousedown', (e) => e.preventDefault());

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
  });

  // Remove chips when user starts typing
  input.addEventListener('focus', () => {
    document.querySelectorAll('.ps-chips').forEach(el => el.remove());
  });

})();
