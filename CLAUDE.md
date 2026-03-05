# Project Instructions for Claude Code

## Project: ADHD Self-Hypnosis Webapp
- Domain: adhdselfhypnosis.com
- Hosted on: Vercel
- Stack: Vite + React

## KNOWN BUG: Vercel build fails
Vercel looks for root directory "mindflow-deploy" which doesn't exist. Fix by adding vercel.json at project root with `{ "buildCommand": "npm run build", "outputDirectory": "dist" }` or whatever matches this Vite project.

## TASK 1: Add 8 ADHD symptom landing pages
Create routes (using whatever router this project uses, add react-router-dom if needed):
- /emotional-dysregulation
- /executive-dysfunction
- /time-blindness
- /rejection-sensitive-dysphoria
- /working-memory
- /sleep-disturbances
- /hyperfocus
- /chronic-shame

### Design spec (same for all 8 pages):
- Light & airy, Poppins font (Google Fonts), sage green #7C9A82, warm #C4A882, bg #FAFBF9
- Sticky nav: "Mind Refuge" logo + "Open the App" button → /hypnosis-generator
- Hero section: split layout, headline + CTA left, image placeholder in lavender SVG blob (#C8CCE5) right
- CTA button text: "Build your self-hypnosis for free" → links to /hypnosis-generator
- Sub-CTA: "No sign-up required · 25 minutes · Designed for ADHD brains"
- "Why Self-Hypnosis" section: 3 cards (Rewires reflexes, Works in 25 min, Zero willpower required)
- "How It Works" section: 3 steps (Describe struggle → Listen 25 min → Rewire the pattern) + CTA
- "Why Hypnosis Works for ADHD" section: 3 science-backed cards:
  1. THETA WAVES: ADHD brains have excess theta waves — the exact state hypnosis targets. Elevated theta/beta ratio = deep hypnotic trance signature.
  2. PREFRONTAL CORTEX: Stanford research shows hypnosis increases connectivity in dorsolateral PFC + anterior cingulate cortex — the two regions most underactive in ADHD.
  3. ABSORPTION: #1 predictor of hypnotic responsiveness is "absorption" (total immersion). ADHD = high absorption scores = better hypnotic response than neurotypicals.
- Testimonials: 3 cards per page
- Final CTA: emotional headline + button
- Footer: wellness disclaimer

### Unique copy per page:

**EMOTIONAL DYSREGULATION:**
Hero: "Your emotions aren't too much. Your brain just moves too fast."
Sub: Emotional dysregulation affects up to 70% of adults with ADHD.
Benefit1: "Rewires emotional reflexes"
Testimonials: Aïsha M. (34, Slack message spiral), Daniel K. (29, therapist noticed), Priya L. (41, too sensitive)
CTA: "You deserve to feel without drowning."

**EXECUTIVE DYSFUNCTION:**
Hero: "Your brain isn't lazy. It's stuck behind a wall."
Sub: Executive dysfunction affects nearly every adult with ADHD.
Benefit1: "Dissolves the starting block"
Testimonials: Marcus T. (31, 47 tabs), Sophie R. (36, called it laziness 30 years), James L. (28, dreading 20-min task)
CTA: "You deserve to move without fighting yourself."

**TIME BLINDNESS:**
Hero: "You're not irresponsible. Your brain just can't feel time."
Sub: Up to 90% of adults with ADHD experience time blindness.
Benefit1: "Rebuilds your sense of time"
Testimonials: Léa M. (33, now and not now), Ryan K. (27, fired twice), Nina P. (39, partner said late)
CTA: "You deserve to feel time on your side."

**REJECTION SENSITIVE DYSPHORIA:**
Hero: "That pain isn't weakness. Your brain just feels rejection at full volume."
Sub: Nearly 100% of adults with ADHD experience RSD.
Benefit1: "Quiets the rejection alarm"
Testimonials: Zara A. (32, left on read 6 hours), Chris W. (35, boss feedback), Elena F. (40, avoided everything)
CTA: "You deserve to connect without bracing for pain."

**WORKING MEMORY:**
Hero: "You're not careless. Your brain just drops things mid-thought."
Sub: Up to 81% of adults with ADHD have impaired working memory.
Benefit1: "Strengthens your mental grip"
Testimonials: Tom B. (30, walk into room), Mira S. (37, partner's love language), David H. (26, re-read paragraph 8x)
CTA: "You deserve to hold onto the things that matter."

**SLEEP DISTURBANCES:**
Hero: "Your brain won't shut up. And that's why you can't sleep."
Sub: 60-80% of adults with ADHD have sleep disturbances.
Benefit1: "Quiets the midnight chatter"
Testimonials: Kate J. (34, replaying conversations), Alex N. (29, revenge bedtime), Jordan T. (42, 4 to 7 hours)
CTA: "You deserve to rest without a fight."

**HYPERFOCUS:**
Hero: "Hyperfocus isn't a gift. Not when you can't choose it."
Sub: The ADHD brain doesn't lack attention — it can't regulate it.
Benefit1: "Gives you the steering wheel"
Testimonials: Sam D. (33, spice rack Saturday), Rachel M. (38, phone 4 hours), Amir K. (25, ratio shifted)
CTA: "You deserve to choose where your mind goes."

**CHRONIC SHAME:**
Hero: "You're not broken. You were just never given the right tools."
Sub: 89% of women and 81% of men with ADHD carry clinically significant shame.
Benefit1: "Rewrites the shame narrative"
Testimonials: Laura C. (41, calling myself lazy since 8), Nate R. (35, louder than meds), Priya G. (44, stopped apologizing)
CTA: "You deserve to exist without apologizing."

## TASK 2: Build /hypnosis-generator page
Multi-step form, same visual style (sage green, Poppins, calming):

Step 1 — "Choose Your Focus": tile selector, pick one → emotional overwhelm, rumination, task paralysis, rejection sensitivity, sensory overload, sleep anxiety, social anxiety, performance anxiety, time pressure stress

Step 2 — "Describe Your Trigger": required text input → "e.g. When my boss gives me critical feedback..."

Step 3 — "Your Body's Warning Signs": 2 optional text inputs → e.g. tight chest, jaw clenching

Step 4 — "Create Your Safe Place": optional tile selector (forest, beach, cozy room, mountains, cabin, garden, library, lakeside) + 3 optional sensory inputs (sound, texture, smell/visual)

Step 5 — "Background Music": tile selector → ambient pads (default), nature soundscape, piano minimal, lo-fi calm, binaural style, no music

### Conditional defaults (apply before building SSML):
- SAFE_PLACE_SENSORY_1 empty → "wind moving through leaves, distant waves, or soft birdsong"
- SAFE_PLACE_SENSORY_2 empty → "a comfortable temperature, a gentle breeze, or the feeling of soft fabric supporting you"
- SAFE_PLACE_SENSORY_3 empty → "clean air, a subtle scent of pine or ocean, or warm light in the scene"
- SAFE_PLACE_TYPE empty → "a quiet, comfortable place"
- Body cues: both filled → use them; one filled → add generic examples; none → "tight chest, jaw clenching, shoulders rising, or thoughts speeding up"

The form output is an SSML string for ElevenLabs TTS API. For now, just build the form UI and show the generated SSML as preview text. We'll connect the API later.
