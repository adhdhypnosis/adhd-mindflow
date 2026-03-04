# MindFlow — Self-Hypnosis for ADHD

Personalized AI-powered self-hypnosis sessions using ElevenLabs text-to-speech.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

## Deploy to Production

```bash
# Build for production
npm run build

# Output is in /dist — upload this folder to your hosting
```

The `/dist` folder contains static files (HTML, JS, CSS) that can be served by any web server — Apache, Nginx, cPanel, etc.

### cPanel / Shared Hosting
1. Run `npm run build` on your local machine
2. Upload the contents of `/dist` to your `public_html` folder (or subdomain folder)
3. That's it — no server-side runtime needed

### VPS / Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/mindflow/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache (.htaccess)
Add this to `/dist/.htaccess`:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## ElevenLabs Setup

1. Create account at [elevenlabs.io](https://elevenlabs.io)
2. Go to Profile → API Key
3. Create key with these permissions:
   - Text to Speech → **Access**
   - Models → **Access**  
   - Voices → **Read**
   - User → **Read**
   - Everything else → No Access
4. Paste key into the app's 🔑 panel

## Production Security Note

The current version stores the API key in the browser (client-side). For production with paying users, you should move the ElevenLabs call to a backend proxy:

```javascript
// Example: Vercel/Netlify serverless function (api/generate.js)
export default async function handler(req, res) {
  const { text, voiceId } = req.body;
  
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": process.env.ELEVENLABS_API_KEY, // Server-side env var
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: { stability: 0.75, similarity_boost: 0.75, style: 0.35, use_speaker_boost: true },
    }),
  });

  const audioBuffer = await response.arrayBuffer();
  res.setHeader("Content-Type", "audio/mpeg");
  res.send(Buffer.from(audioBuffer));
}
```

Then update the frontend to call `/api/generate` instead of ElevenLabs directly.

## Stripe Integration

The payment forms are currently UI mockups. To wire up real payments:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Install Stripe.js: `npm install @stripe/stripe-js @stripe/react-stripe-js`
3. Replace the card input fields with Stripe Elements
4. Create a server-side endpoint to handle payment intents

## Tech Stack

- React 18 + Vite
- ElevenLabs TTS API
- Pure CSS (no framework — inline styles)
- Google Fonts (Playfair Display + Quicksand)
