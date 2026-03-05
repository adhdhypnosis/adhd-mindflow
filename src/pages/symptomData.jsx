const SAGE_DEEP = "#4A6B50";

const bold = (text) => `<strong style="color: ${SAGE_DEEP}">${text}</strong>`;

export const symptomPages = {
  "emotional-dysregulation": {
    seo: {
      title: "Emotional Dysregulation & ADHD — Build Your Self-Hypnosis | Mind Refuge",
      description: "Emotional dysregulation affects up to 70% of adults with ADHD. Mind Refuge uses targeted self-hypnosis to help you build the emotional buffer your brain never got. Free 25-minute session.",
    },
    hero: {
      headline: (
        <>
          Your emotions aren't<br />
          <span style={{ color: "#7C9A82" }}>too much.</span><br />
          Your brain just moves<br />
          <span style={{ color: "#7C9A82" }}>too fast.</span>
        </>
      ),
      subtext: "Emotional dysregulation affects up to 70% of adults with ADHD. Mind Refuge uses targeted self-hypnosis to help you build the emotional buffer your brain never got.",
    },
    whySelfHypnosis: {
      intro: "Traditional meditation asks you to empty your mind. That's a nightmare for ADHD. Self-hypnosis does the opposite — it gives your brain a guided story to follow.",
    },
    benefits: [
      { title: "Rewires emotional reflexes", desc: "Targeted suggestions train your nervous system to pause before reacting — building an automatic buffer between feeling and response." },
      { title: "Works in 25 minutes", desc: "Sessions are short by design. No hour-long commitments. Your ADHD brain stays engaged because the content is structured and novel." },
      { title: "Zero willpower required", desc: "Just press play and listen. No focus required, no clearing your mind. Hypnosis works with your wandering attention, not against it." },
    ],
    steps: [
      { title: "Describe your struggle", desc: "Tell us what emotional pattern hits you hardest — spiraling after criticism, explosive frustration, emotional shutdowns. The AI personalizes your session." },
      { title: "Listen for 25 minutes", desc: "A custom self-hypnosis session is generated for your specific experience. Close your eyes, put on headphones, and let it work." },
      { title: "Rewire the pattern", desc: "With each session, your brain builds new neural pathways. The space between trigger and reaction gets a little wider every time." },
    ],
    science: [
      { icon: "brainwave", title: "Your brain is already in the right state", text: `ADHD brains produce ${bold("excess theta waves")} — the slow brainwaves linked to daydreaming and inward focus. Hypnosis works by guiding the brain into a theta-dominant state. Where neurotypicals have to work to get there, your brain is already primed for it. Research shows the elevated theta/beta ratio in ADHD is the exact signature of deep hypnotic trance.` },
      { icon: "⚡", title: "It rewires where ADHD is weakest", text: `Stanford research found that hypnosis increases functional connectivity in the ${bold("dorsolateral prefrontal cortex and anterior cingulate cortex")} — the two regions most underactive in ADHD. These are your brain's executive control and emotional regulation centers. Repeated hypnosis sessions essentially train the circuits your brain struggles to activate on its own.` },
      { icon: "🎯", title: "Hyperfocus is your superpower here", text: `The #1 predictor of hypnotic responsiveness is a trait called ${bold('"absorption"')} — the ability to become completely immersed in an experience. Sound familiar? That's hyperfocus. Studies show ADHD individuals score significantly higher on absorption scales, meaning you're likely to respond to hypnosis <em>better</em> than neurotypicals, not worse.` },
    ],
    testimonials: [
      { quote: "I used to cry at my desk over a Slack message. After two weeks of sessions, I noticed something wild — I'd read a tough email and just... pause. No spiral. That pause didn't exist before.", name: "Aïsha M.", detail: "Diagnosed at 34 · Using Mind Refuge for 3 months" },
      { quote: "My therapist noticed the change before I did. I was describing a conflict with my partner and she said 'you seem calmer about it.' I was. For the first time.", name: "Daniel K.", detail: "Diagnosed at 29 · Using Mind Refuge for 6 weeks" },
      { quote: "I always thought I was just 'too sensitive.' Turns out my brain needed a different kind of training. 25 minutes before bed changed my emotional baseline.", name: "Priya L.", detail: "Diagnosed at 41 · Using Mind Refuge for 2 months" },
    ],
    finalCta: {
      headline: (
        <>You deserve to feel<br /><span style={{ color: "#7C9A82" }}>without drowning.</span></>
      ),
      subtext: "Your emotions are valid. They just need a wider channel to flow through. Mind Refuge helps you build that — 25 minutes at a time.",
    },
  },

  "executive-dysfunction": {
    seo: {
      title: "Executive Dysfunction & ADHD — Build Your Self-Hypnosis | Mind Refuge",
      description: "ADHD paralysis isn't laziness — it's a wall between you and action. Mind Refuge uses targeted self-hypnosis to help you break through executive dysfunction. Free 25-minute session.",
    },
    hero: {
      headline: (
        <>
          Your brain isn't<br />
          <span style={{ color: "#7C9A82" }}>lazy.</span><br />
          It's stuck behind<br />
          <span style={{ color: "#7C9A82" }}>a wall.</span>
        </>
      ),
      subtext: "ADHD paralysis isn't laziness — it's a neurological wall between intention and action. Mind Refuge uses targeted self-hypnosis to help your brain find the door through that wall.",
    },
    whySelfHypnosis: {
      intro: "Traditional productivity advice assumes your brain can 'just start.' That's not how ADHD works. Self-hypnosis bypasses the executive function bottleneck entirely.",
    },
    benefits: [
      { title: "Rewires initiation pathways", desc: "Targeted suggestions train your subconscious to lower the activation energy for tasks — making it easier to start without the usual mental battle." },
      { title: "Works in 25 minutes", desc: "Sessions are short by design. No hour-long commitments. Your ADHD brain stays engaged because the content is structured and novel." },
      { title: "Zero willpower required", desc: "Just press play and listen. No focus required, no clearing your mind. Hypnosis works with your wandering attention, not against it." },
    ],
    steps: [
      { title: "Describe your struggle", desc: "Tell us what executive function challenge hits hardest — task paralysis, inability to prioritize, starting but never finishing. The AI personalizes your session." },
      { title: "Listen for 25 minutes", desc: "A custom self-hypnosis session is generated for your specific experience. Close your eyes, put on headphones, and let it work." },
      { title: "Rewire the pattern", desc: "With each session, your brain builds new neural pathways. The wall between intention and action gets a little thinner every time." },
    ],
    science: [
      { icon: "brainwave", title: "Your brain is already in the right state", text: `ADHD brains produce ${bold("excess theta waves")} — the slow brainwaves linked to daydreaming and inward focus. Hypnosis works by guiding the brain into a theta-dominant state. Where neurotypicals have to work to get there, your brain is already primed for it.` },
      { icon: "⚡", title: "It rewires where ADHD is weakest", text: `Stanford research found that hypnosis increases functional connectivity in the ${bold("dorsolateral prefrontal cortex")} — the exact region responsible for task initiation and executive control that's underactive in ADHD. Repeated sessions train these circuits to fire more reliably.` },
      { icon: "🎯", title: "Hyperfocus is your superpower here", text: `The #1 predictor of hypnotic responsiveness is a trait called ${bold('"absorption"')} — the ability to become completely immersed in an experience. That's hyperfocus. ADHD individuals score significantly higher on absorption scales, meaning you respond to hypnosis <em>better</em> than neurotypicals.` },
    ],
    testimonials: [
      { quote: "I had 47 tabs open and couldn't start any of them. After three sessions, I noticed I was just... doing things. Not all of them, but the wall felt shorter.", name: "Marcus T.", detail: "Diagnosed at 31 · Using Mind Refuge for 2 months" },
      { quote: "Everyone called it laziness. My therapist called it executive dysfunction. Mind Refuge was the first thing that actually helped me move through it instead of just naming it.", name: "Sophie R.", detail: "Diagnosed at 27 · Using Mind Refuge for 10 weeks" },
      { quote: "The worst part was dreading tasks I actually wanted to do. After a month of sessions, the dread started dissolving. I still struggle, but I can start now.", name: "James L.", detail: "Diagnosed at 38 · Using Mind Refuge for 6 weeks" },
    ],
    finalCta: {
      headline: (
        <>You're not stuck.<br /><span style={{ color: "#7C9A82" }}>The wall can come down.</span></>
      ),
      subtext: "Executive dysfunction isn't a character flaw. It's a neurological pattern — and patterns can be rewired. Mind Refuge helps you do that, 25 minutes at a time.",
    },
  },

  "time-blindness": {
    seo: {
      title: "Time Blindness & ADHD — Build Your Self-Hypnosis | Mind Refuge",
      description: "Up to 90% of adults with ADHD experience time blindness. Mind Refuge uses targeted self-hypnosis to help your brain develop a stronger sense of time. Free 25-minute session.",
    },
    hero: {
      headline: (
        <>
          You're not<br />
          <span style={{ color: "#7C9A82" }}>irresponsible.</span><br />
          Your brain just can't<br />
          <span style={{ color: "#7C9A82" }}>feel time.</span>
        </>
      ),
      subtext: "Up to 90% of adults with ADHD experience time blindness. Mind Refuge uses targeted self-hypnosis to help your brain build an internal clock it was never given.",
    },
    whySelfHypnosis: {
      intro: "Alarms and calendars treat the symptom, not the cause. Self-hypnosis works at the subconscious level — retraining your brain's internal sense of time passing.",
    },
    benefits: [
      { title: "Rebuilds time awareness", desc: "Targeted suggestions help your subconscious develop a felt sense of time — so you can feel 20 minutes passing instead of looking up and losing 3 hours." },
      { title: "Works in 25 minutes", desc: "Sessions are short by design. No hour-long commitments. Your ADHD brain stays engaged because the content is structured and novel." },
      { title: "Zero willpower required", desc: "Just press play and listen. No focus required, no clearing your mind. Hypnosis works with your wandering attention, not against it." },
    ],
    steps: [
      { title: "Describe your struggle", desc: "Tell us what time blindness pattern hits hardest — chronic lateness, losing entire afternoons, underestimating how long things take. The AI personalizes your session." },
      { title: "Listen for 25 minutes", desc: "A custom self-hypnosis session is generated for your specific experience. Close your eyes, put on headphones, and let it work." },
      { title: "Rewire the pattern", desc: "With each session, your brain builds new neural pathways. Your internal clock gets a little more calibrated every time." },
    ],
    science: [
      { icon: "brainwave", title: "Your brain is already in the right state", text: `ADHD brains produce ${bold("excess theta waves")} — the slow brainwaves linked to daydreaming and inward focus. Hypnosis works by guiding the brain into a theta-dominant state. Your brain is already primed for it.` },
      { icon: "⚡", title: "It rewires where ADHD is weakest", text: `Stanford research found that hypnosis increases functional connectivity in the ${bold("prefrontal cortex and cerebellum")} — regions responsible for time perception and sequencing that are underactive in ADHD. Repeated sessions train your brain's internal timing circuits.` },
      { icon: "🎯", title: "Hyperfocus is your superpower here", text: `The #1 predictor of hypnotic responsiveness is a trait called ${bold('"absorption"')} — the ability to become completely immersed. That's hyperfocus. ADHD individuals score significantly higher on absorption scales, making you more responsive to hypnotic suggestion.` },
    ],
    testimonials: [
      { quote: "My brain only has two time zones: now and not now. After a month of sessions, I started feeling the space between them. It's subtle, but it's real.", name: "Léa M.", detail: "Diagnosed at 33 · Using Mind Refuge for 3 months" },
      { quote: "I got fired twice for being late. Not because I didn't care — because I literally couldn't feel time passing. The sessions helped me build something I never had.", name: "Ryan K.", detail: "Diagnosed at 26 · Using Mind Refuge for 8 weeks" },
      { quote: "My partner said I was always late because I didn't respect her time. It wasn't that. My brain just couldn't track it. After two months, she noticed the change before I did.", name: "Nina P.", detail: "Diagnosed at 37 · Using Mind Refuge for 2 months" },
    ],
    finalCta: {
      headline: (
        <>Time isn't your enemy.<br /><span style={{ color: "#7C9A82" }}>Your brain just needs to learn to feel it.</span></>
      ),
      subtext: "Time blindness isn't carelessness. It's a neurological gap — and gaps can be bridged. Mind Refuge helps your brain build that bridge, 25 minutes at a time.",
    },
  },

  "rejection-sensitive-dysphoria": {
    seo: {
      title: "Rejection Sensitive Dysphoria & ADHD — Build Your Self-Hypnosis | Mind Refuge",
      description: "Nearly 100% of adults with ADHD experience rejection sensitive dysphoria. Mind Refuge uses targeted self-hypnosis to help turn down the volume on rejection pain. Free 25-minute session.",
    },
    hero: {
      headline: (
        <>
          That pain isn't<br />
          <span style={{ color: "#7C9A82" }}>weakness.</span><br />
          Your brain just feels rejection<br />
          <span style={{ color: "#7C9A82" }}>at full volume.</span>
        </>
      ),
      subtext: "Nearly 100% of adults with ADHD report experiencing rejection sensitive dysphoria. Mind Refuge uses targeted self-hypnosis to help you turn down the volume on that pain.",
    },
    whySelfHypnosis: {
      intro: "You can't think your way out of RSD — it hits faster than thought. Self-hypnosis works at the subconscious level, retraining the automatic pain response before it fires.",
    },
    benefits: [
      { title: "Rewires the pain response", desc: "Targeted suggestions train your nervous system to process perceived rejection without the full-body emotional crash that follows." },
      { title: "Works in 25 minutes", desc: "Sessions are short by design. No hour-long commitments. Your ADHD brain stays engaged because the content is structured and novel." },
      { title: "Zero willpower required", desc: "Just press play and listen. No focus required, no clearing your mind. Hypnosis works with your wandering attention, not against it." },
    ],
    steps: [
      { title: "Describe your struggle", desc: "Tell us what rejection pattern hits hardest — a friend's tone shift, being left on read, constructive feedback that feels like an attack. The AI personalizes your session." },
      { title: "Listen for 25 minutes", desc: "A custom self-hypnosis session is generated for your specific experience. Close your eyes, put on headphones, and let it work." },
      { title: "Rewire the pattern", desc: "With each session, your brain builds new neural pathways. The volume on rejection pain gets turned down a little more each time." },
    ],
    science: [
      { icon: "brainwave", title: "Your brain is already in the right state", text: `ADHD brains produce ${bold("excess theta waves")} — the slow brainwaves linked to daydreaming and inward focus. Hypnosis works by guiding the brain into a theta-dominant state. Your brain is already primed for it.` },
      { icon: "⚡", title: "It rewires where ADHD is weakest", text: `Stanford research found that hypnosis increases functional connectivity in the ${bold("anterior cingulate cortex and amygdala circuits")} — the regions that process social pain and emotional intensity. These are the exact circuits that overfire in RSD. Repeated sessions help calm the alarm system.` },
      { icon: "🎯", title: "Hyperfocus is your superpower here", text: `The #1 predictor of hypnotic responsiveness is a trait called ${bold('"absorption"')} — the ability to become completely immersed. That's hyperfocus. ADHD individuals score significantly higher on absorption scales, making you more responsive to the suggestions that rewire rejection sensitivity.` },
    ],
    testimonials: [
      { quote: "Someone left me on read and I spent 4 hours convinced they hated me. After six weeks of sessions, the same thing happened and I just... moved on. I almost didn't notice.", name: "Zara A.", detail: "Diagnosed at 30 · Using Mind Refuge for 3 months" },
      { quote: "My boss gave me feedback and I didn't spiral for the first time in my career. I actually heard what she said instead of just feeling the pain of it.", name: "Chris W.", detail: "Diagnosed at 35 · Using Mind Refuge for 2 months" },
      { quote: "I avoided everything — new relationships, job applications, even texting friends — because the possibility of rejection was unbearable. The sessions didn't fix it overnight, but I'm applying for things again.", name: "Elena F.", detail: "Diagnosed at 28 · Using Mind Refuge for 10 weeks" },
    ],
    finalCta: {
      headline: (
        <>You deserve connection<br /><span style={{ color: "#7C9A82" }}>without the fear.</span></>
      ),
      subtext: "RSD isn't oversensitivity. It's your brain's pain system turned up to 11. Mind Refuge helps you turn it down — 25 minutes at a time.",
    },
  },

  "working-memory": {
    seo: {
      title: "Working Memory & ADHD — Build Your Self-Hypnosis | Mind Refuge",
      description: "81% of adults with ADHD have working memory deficits. Mind Refuge uses targeted self-hypnosis to help strengthen your brain's ability to hold and use information. Free 25-minute session.",
    },
    hero: {
      headline: (
        <>
          You're not<br />
          <span style={{ color: "#7C9A82" }}>careless.</span><br />
          Your brain just drops things<br />
          <span style={{ color: "#7C9A82" }}>mid-thought.</span>
        </>
      ),
      subtext: "81% of adults with ADHD have significant working memory deficits. Mind Refuge uses targeted self-hypnosis to help strengthen your brain's ability to hold and use information in real time.",
    },
    whySelfHypnosis: {
      intro: "Reminders and sticky notes treat the symptom. Self-hypnosis works at the neural level — strengthening the working memory circuits your brain struggles to maintain.",
    },
    benefits: [
      { title: "Strengthens mental hold", desc: "Targeted suggestions train your subconscious to maintain information longer — so thoughts stop slipping away mid-sentence and mid-task." },
      { title: "Works in 25 minutes", desc: "Sessions are short by design. No hour-long commitments. Your ADHD brain stays engaged because the content is structured and novel." },
      { title: "Zero willpower required", desc: "Just press play and listen. No focus required, no clearing your mind. Hypnosis works with your wandering attention, not against it." },
    ],
    steps: [
      { title: "Describe your struggle", desc: "Tell us what working memory pattern hits hardest — forgetting why you walked into a room, losing your train of thought, re-reading the same paragraph. The AI personalizes your session." },
      { title: "Listen for 25 minutes", desc: "A custom self-hypnosis session is generated for your specific experience. Close your eyes, put on headphones, and let it work." },
      { title: "Rewire the pattern", desc: "With each session, your brain builds stronger working memory pathways. Information sticks a little longer each time." },
    ],
    science: [
      { icon: "brainwave", title: "Your brain is already in the right state", text: `ADHD brains produce ${bold("excess theta waves")} — the slow brainwaves linked to daydreaming and inward focus. Hypnosis works by guiding the brain into a theta-dominant state. Your brain is already primed for it.` },
      { icon: "⚡", title: "It rewires where ADHD is weakest", text: `Stanford research found that hypnosis increases functional connectivity in the ${bold("dorsolateral prefrontal cortex")} — the primary seat of working memory. This is one of the most underactive regions in ADHD. Repeated hypnosis sessions train these circuits to maintain information more reliably.` },
      { icon: "🎯", title: "Hyperfocus is your superpower here", text: `The #1 predictor of hypnotic responsiveness is a trait called ${bold('"absorption"')} — the ability to become completely immersed. That's hyperfocus. ADHD individuals score significantly higher on absorption scales, making you naturally more responsive to hypnotic memory-strengthening suggestions.` },
    ],
    testimonials: [
      { quote: "I'd walk into a room and forget why I was there — every single time. After a month of sessions, I started arriving with the thought still intact. Small thing. Huge for me.", name: "Tom B.", detail: "Diagnosed at 32 · Using Mind Refuge for 3 months" },
      { quote: "My partner's love language is words of affirmation. I kept forgetting things she told me and she thought I didn't care. The sessions helped me actually hold onto what matters.", name: "Mira S.", detail: "Diagnosed at 29 · Using Mind Refuge for 8 weeks" },
      { quote: "I'd re-read the same paragraph 5 times and still not retain it. After six weeks, I noticed I was getting through whole chapters. My brain was actually holding the thread.", name: "David H.", detail: "Diagnosed at 40 · Using Mind Refuge for 2 months" },
    ],
    finalCta: {
      headline: (
        <>Your thoughts deserve<br /><span style={{ color: "#7C9A82" }}>to stay.</span></>
      ),
      subtext: "Working memory issues aren't carelessness. They're a neurological gap — and gaps can be strengthened. Mind Refuge helps your brain hold on, 25 minutes at a time.",
    },
  },

  "sleep-disturbances": {
    seo: {
      title: "Sleep Disturbances & ADHD — Build Your Self-Hypnosis | Mind Refuge",
      description: "60-80% of adults with ADHD struggle with sleep disturbances. Mind Refuge uses targeted self-hypnosis to help quiet your racing mind at night. Free 25-minute session.",
    },
    hero: {
      headline: (
        <>
          Your brain<br />
          <span style={{ color: "#7C9A82" }}>won't shut up.</span><br />
          And that's why you<br />
          <span style={{ color: "#7C9A82" }}>can't sleep.</span>
        </>
      ),
      subtext: "60-80% of adults with ADHD struggle with sleep disturbances. Mind Refuge uses targeted self-hypnosis to help quiet the racing mind that keeps you awake at 3am.",
    },
    whySelfHypnosis: {
      intro: "Sleep hygiene tips assume your brain can 'just relax.' ADHD brains can't. Self-hypnosis gives your mind something to follow instead of demanding it be quiet.",
    },
    benefits: [
      { title: "Quiets the racing mind", desc: "Targeted suggestions guide your overactive brain into a natural wind-down — no fighting your thoughts, no forcing stillness. Your mind follows the narrative into sleep." },
      { title: "Works in 25 minutes", desc: "Sessions are designed to transition you from wired to drowsy. Your ADHD brain stays engaged just long enough to let go." },
      { title: "Zero willpower required", desc: "Just press play and listen. No focus required, no clearing your mind. Hypnosis works with your wandering attention, not against it." },
    ],
    steps: [
      { title: "Describe your struggle", desc: "Tell us what sleep pattern hits hardest — racing thoughts at bedtime, revenge bedtime procrastination, waking at 3am with a busy brain. The AI personalizes your session." },
      { title: "Listen for 25 minutes", desc: "A custom self-hypnosis session is generated for your specific experience. Put on headphones, close your eyes, and let your brain follow the path to sleep." },
      { title: "Rewire the pattern", desc: "With each session, your brain builds new wind-down pathways. Falling asleep gets a little easier every night." },
    ],
    science: [
      { icon: "brainwave", title: "Your brain is already in the right state", text: `ADHD brains produce ${bold("excess theta waves")} — the slow brainwaves linked to daydreaming. The problem at night isn't too little theta, it's that your brain can't transition from beta (active thinking) to theta (drowsiness) smoothly. Hypnosis creates that bridge.` },
      { icon: "⚡", title: "It calms the hyperactive default mode network", text: `Research shows ADHD brains have an ${bold("overactive default mode network")} — the system responsible for mind-wandering and rumination. This is why your brain won't shut up at night. Hypnosis has been shown to reduce DMN activity, giving your racing mind permission to rest.` },
      { icon: "🎯", title: "Hyperfocus is your superpower here", text: `The #1 predictor of hypnotic responsiveness is a trait called ${bold('"absorption"')} — the ability to become completely immersed. ADHD individuals score significantly higher on absorption scales. When channeled into a sleep-focused session, this trait helps your brain fully surrender to rest.` },
    ],
    testimonials: [
      { quote: "Every night I'd lie there replaying conversations from 2019. After three weeks of pre-sleep sessions, my brain started letting go. I still think, but it's not a death grip anymore.", name: "Kate J.", detail: "Diagnosed at 36 · Using Mind Refuge for 3 months" },
      { quote: "Revenge bedtime procrastination was ruining my life. I knew I needed sleep but my brain wanted 'me time.' The sessions became my me time — and I actually fell asleep.", name: "Alex N.", detail: "Diagnosed at 25 · Using Mind Refuge for 6 weeks" },
      { quote: "I went from 4 hours of sleep to 7. Not every night, but most nights. My psychiatrist asked what changed. I said 'I gave my brain something to listen to instead of itself.'", name: "Jordan T.", detail: "Diagnosed at 42 · Using Mind Refuge for 2 months" },
    ],
    finalCta: {
      headline: (
        <>You deserve a brain that<br /><span style={{ color: "#7C9A82" }}>lets you rest.</span></>
      ),
      subtext: "Your racing mind isn't a flaw. It just needs a guided path to silence. Mind Refuge builds that path — 25 minutes before bed.",
    },
  },

  "hyperfocus": {
    seo: {
      title: "Hyperfocus & ADHD — Build Your Self-Hypnosis | Mind Refuge",
      description: "Hyperfocus isn't a gift when you can't control it. Mind Refuge uses targeted self-hypnosis to help you regulate attention dysregulation. Free 25-minute session.",
    },
    hero: {
      headline: (
        <>
          Hyperfocus isn't<br />
          <span style={{ color: "#7C9A82" }}>a gift.</span><br />
          Not when you<br />
          <span style={{ color: "#7C9A82" }}>can't choose it.</span>
        </>
      ),
      subtext: "ADHD isn't an attention deficit — it's attention dysregulation. You can focus for 8 hours on the wrong thing and zero minutes on the right one. Mind Refuge helps you reclaim the dial.",
    },
    whySelfHypnosis: {
      intro: "You don't need more focus. You need control over where your focus goes. Self-hypnosis trains your subconscious to recognize and release unproductive hyperfocus traps.",
    },
    benefits: [
      { title: "Recalibrates attention", desc: "Targeted suggestions train your brain to notice when hyperfocus has taken the wheel — creating a gentle internal alert system that wasn't there before." },
      { title: "Works in 25 minutes", desc: "Sessions are short by design. No hour-long commitments. Your ADHD brain stays engaged because the content is structured and novel." },
      { title: "Zero willpower required", desc: "Just press play and listen. No focus required, no clearing your mind. Hypnosis works with your wandering attention, not against it." },
    ],
    steps: [
      { title: "Describe your struggle", desc: "Tell us what hyperfocus pattern hits hardest — losing entire days to research holes, inability to disengage from screens, neglecting responsibilities while locked in. The AI personalizes your session." },
      { title: "Listen for 25 minutes", desc: "A custom self-hypnosis session is generated for your specific experience. Close your eyes, put on headphones, and let it work." },
      { title: "Rewire the pattern", desc: "With each session, your brain builds new awareness pathways. The ability to choose where your attention goes gets stronger every time." },
    ],
    science: [
      { icon: "brainwave", title: "Your brain is already in the right state", text: `ADHD brains produce ${bold("excess theta waves")} — the slow brainwaves linked to deep absorption. This is exactly why hyperfocus feels so all-consuming. Hypnosis works in that same theta state, allowing it to reshape how your brain enters and exits deep focus.` },
      { icon: "⚡", title: "It strengthens the attention switchboard", text: `Hyperfocus occurs when the ${bold("anterior cingulate cortex")} — your brain's attention switchboard — fails to redirect focus. Stanford research shows hypnosis increases connectivity in this exact region. Repeated sessions help your brain build a more responsive switch.` },
      { icon: "🎯", title: "Hyperfocus is your superpower here", text: `The #1 predictor of hypnotic responsiveness is a trait called ${bold('"absorption"')} — the ability to become completely immersed. That's literally hyperfocus. This means you're uniquely responsive to the very tool designed to help you regulate it. Your challenge becomes your advantage.` },
    ],
    testimonials: [
      { quote: "I reorganized my entire spice rack on a Saturday instead of doing my taxes. That's not a joke — that's my life. After two months of sessions, I catch myself earlier. Not always, but enough.", name: "Sam D.", detail: "Diagnosed at 33 · Using Mind Refuge for 3 months" },
      { quote: "I'd pick up my phone to check one thing and look up 4 hours later. The sessions taught my brain to create little exit ramps. I still hyperfocus, but I can get off the highway now.", name: "Rachel M.", detail: "Diagnosed at 28 · Using Mind Refuge for 8 weeks" },
      { quote: "My therapist said the goal isn't to eliminate hyperfocus — it's to shift the ratio. More intentional deep work, less involuntary rabbit holes. That ratio has shifted.", name: "Amir K.", detail: "Diagnosed at 39 · Using Mind Refuge for 2 months" },
    ],
    finalCta: {
      headline: (
        <>Your focus is powerful.<br /><span style={{ color: "#7C9A82" }}>It's time you got to aim it.</span></>
      ),
      subtext: "Hyperfocus isn't the problem. Lack of control is. Mind Refuge helps your brain build the dial — 25 minutes at a time.",
    },
  },

  "chronic-shame": {
    seo: {
      title: "Chronic Shame & ADHD — Build Your Self-Hypnosis | Mind Refuge",
      description: "89% of women and 81% of men with ADHD report chronic shame. Mind Refuge uses targeted self-hypnosis to help you release the shame your brain collected. Free 25-minute session.",
    },
    hero: {
      headline: (
        <>
          You're not<br />
          <span style={{ color: "#7C9A82" }}>broken.</span><br />
          You were just never given<br />
          <span style={{ color: "#7C9A82" }}>the right tools.</span>
        </>
      ),
      subtext: "89% of women and 81% of men with ADHD report chronic shame. Mind Refuge uses targeted self-hypnosis to help you release the shame your brain has been collecting for decades.",
    },
    whySelfHypnosis: {
      intro: "You can't logic your way out of shame — it lives deeper than thought. Self-hypnosis accesses the subconscious level where shame stories are stored and rewrites them.",
    },
    benefits: [
      { title: "Rewrites shame narratives", desc: "Targeted suggestions reach the subconscious beliefs about yourself — 'I'm lazy,' 'I'm broken,' 'I'm too much' — and replace them with more accurate stories." },
      { title: "Works in 25 minutes", desc: "Sessions are short by design. No hour-long commitments. Your ADHD brain stays engaged because the content is structured and novel." },
      { title: "Zero willpower required", desc: "Just press play and listen. No focus required, no clearing your mind. Hypnosis works with your wandering attention, not against it." },
    ],
    steps: [
      { title: "Describe your struggle", desc: "Tell us what shame pattern hits hardest — the inner critic, apologizing for existing, feeling fundamentally flawed. The AI personalizes your session." },
      { title: "Listen for 25 minutes", desc: "A custom self-hypnosis session is generated for your specific experience. Close your eyes, put on headphones, and let it work." },
      { title: "Rewire the pattern", desc: "With each session, your brain builds new self-belief pathways. The voice that says 'you're not enough' gets a little quieter every time." },
    ],
    science: [
      { icon: "brainwave", title: "Your brain is already in the right state", text: `ADHD brains produce ${bold("excess theta waves")} — the slow brainwaves linked to deep inner processing. This is also the state where core beliefs are most accessible and changeable. Hypnosis works in this theta state to reach the shame stories your conscious mind can't touch.` },
      { icon: "⚡", title: "It rewires the self-image circuits", text: `Chronic shame activates the ${bold("medial prefrontal cortex and anterior insula")} — regions tied to self-referential processing and emotional pain. Stanford research shows hypnosis can modify activity in these exact regions, helping your brain update its self-model from 'broken' to 'different.'` },
      { icon: "🎯", title: "Hyperfocus is your superpower here", text: `The #1 predictor of hypnotic responsiveness is a trait called ${bold('"absorption"')} — the ability to become completely immersed. ADHD individuals score significantly higher on absorption scales. This means the healing suggestions in each session go deeper for you than for most people.` },
    ],
    testimonials: [
      { quote: "I've been calling myself lazy since I was 8. After two months of sessions, I caught myself mid-thought and said 'that's not true.' I cried. It was the first time I believed it.", name: "Laura C.", detail: "Diagnosed at 36 · Using Mind Refuge for 3 months" },
      { quote: "The shame was louder than my medication. Adderall helped me focus but it didn't touch the voice that said I was broken. The sessions started turning down that voice.", name: "Nate R.", detail: "Diagnosed at 31 · Using Mind Refuge for 10 weeks" },
      { quote: "I stopped apologizing for existing. Not all at once — but I noticed I was saying 'sorry' less. My friend pointed it out. That's when I knew something had shifted underneath.", name: "Priya G.", detail: "Diagnosed at 27 · Using Mind Refuge for 2 months" },
    ],
    finalCta: {
      headline: (
        <>You were never broken.<br /><span style={{ color: "#7C9A82" }}>It's time your brain believed that.</span></>
      ),
      subtext: "Chronic shame isn't truth — it's a pattern. And patterns can be rewritten. Mind Refuge helps your brain tell a new story, 25 minutes at a time.",
    },
  },
};
