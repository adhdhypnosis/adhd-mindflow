export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.FISH_AUDIO_API_KEY;
  const voiceId = process.env.FISH_AUDIO_VOICE_ID;

  if (!apiKey || !voiceId) {
    return res.status(500).json({ error: 'Fish Audio API not configured' });
  }

  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid text parameter' });
  }

  const MAX_RETRIES = 3;
  let lastError;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch('https://api.fish.audio/v1/tts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          reference_id: voiceId,
          format: 'mp3',
          mp3_bitrate: 128,
          normalize: false,
          latency: 'normal',
          prosody: { speed: 0.85, volume: 0 },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fish Audio API error ${response.status}: ${errorText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length);
      return res.status(200).send(buffer);
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  return res.status(500).json({
    error: 'Failed to generate audio clip after retries',
    details: lastError?.message,
  });
}
