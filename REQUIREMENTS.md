# NovaBrew Coffee Taste Profile Quiz — Requirements

## Overview
A web-based personality quiz that matches coffee subscribers to their coffee personality and recommends a NovaBrew coffee based on their result. The quiz should feel polished, premium, and easy to complete, while giving subscribers a more personal and memorable first experience with the brand.

## Personality Types

### Dark Roast Rebel
Confident, intense, and energized by bold choices. This personality wants strong flavor, big presence, and a coffee experience that feels unapologetic.

### Balanced Brew
Reliable, polished, and easy to love. This personality values consistency, smoothness, and a cup that fits naturally into a daily routine.

### Cozy Sipper
Comfort-first and warm by nature. This personality wants coffee to feel like a small ritual of calm, softness, and familiarity.

### Flavor Chaser
Curious, adventurous, and always looking for something unexpected. This personality wants novelty, edge, and the thrill of trying something memorable.

## Coffee Pairings

- **Dark Roast Rebel** → **Campfire Stories**
  A dark roast with rich, smoky, s'mores-like character. Big presence and bold energy.

- **Balanced Brew** → **Sunrise Blend**
  A medium roast with caramel and chocolate notes. Smooth, dependable, and crowd-pleasing.

- **Cozy Sipper** → **Golden Hour**
  A sweet, smooth coffee with a comforting profile. Designed to feel warm and easy to settle into.

- **Flavor Chaser** → **Double Down**
  An extra-bold espresso-style roast that feels intense and memorable. Strong personality with no apology.

## Quiz Questions

### Question 1
**It is Saturday morning. What sounds best?**
- A) A strong cup, a packed schedule, and getting out the door fast
- B) A calm morning routine, good music, and something reliably great
- C) A blanket, a slow start, and nowhere urgent to be
- D) Trying a new spot in town just because you have never been there before

### Question 2
**Which flavor profile sounds most appealing right now?**
- A) Smoky, intense, and bold
- B) Smooth, balanced, and familiar
- C) Soft, sweet, and comforting
- D) Surprising, sharp, and impossible to ignore

### Question 3
**Your ideal coffee experience feels like:**
- A) A jolt of energy that makes you feel unstoppable
- B) A dependable ritual that fits perfectly into your day
- C) A little moment of comfort you look forward to
- D) A mini adventure that wakes up your curiosity

### Question 4
**Pick the phrase that sounds most like you.**
- A) "Go big or go home."
- B) "I like things done well and done right."
- C) "Comfort is underrated."
- D) "I want to try the weird one."

### Question 5
**If NovaBrew were choosing your next bag, what would you want it to optimize for?**
- A) Strength and depth
- B) Balance and versatility
- C) Warmth and ease
- D) Novelty and edge

### Question 6
**Which setting matches your coffee personality best?**
- A) A late-night city street with neon lights
- B) A bright kitchen with clean lines and morning sun
- C) A cozy window seat on a rainy day
- D) A hidden alley cafe with a menu you cannot pronounce

## Quiz Logic
- Each answer maps to one personality type.
- Track a running tally across all questions.
- At the end, show the full percentage breakdown across all four personality types.
- The highest-scoring personality should be presented as the primary result.
- Results should feel polished and personal, not clinical.

### Answer Mapping
- **A answers** → Dark Roast Rebel
- **B answers** → Balanced Brew
- **C answers** → Cozy Sipper
- **D answers** → Flavor Chaser

## Visual Style
Use the **Minimal** style direction.

The quiz should feel:
- clean
- premium
- airy
- specialty-coffee oriented
- modern without feeling cold

Design characteristics:
- generous white space
- muted earth tones
- soft warm neutrals
- elegant, high-end typography
- subtle motion and smooth transitions
- polished card-based layout

The overall vibe should feel like a premium specialty coffee brand, not a loud internet quiz.

## Extra Features
- **Images:** No for the MVP
- **Icons / emoji:** No
- **Results format:** Show all four personalities as percentages, with one primary personality highlighted first

## Technical Notes
- Built with Next.js + Tailwind CSS
- Single-page app with smooth transitions between questions
- Mobile-responsive and easy to use on a phone
- Results page should feel shareable and polished
- The app should be simple to demo to NovaBrew stakeholders
