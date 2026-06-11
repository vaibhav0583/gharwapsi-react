import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VibeQuiz.css';

const QUESTIONS = [
  {
    id: 'personality',
    question: 'How would you describe yourself?',
    options: [
      { value: 'introvert', label: '🌿 Quiet & reflective', desc: 'I need alone time to recharge' },
      { value: 'extrovert', label: '🎉 Social & outgoing', desc: 'I love meeting new people' },
      { value: 'ambivert', label: '⚖️ A bit of both', desc: 'Depends on my mood!' },
    ]
  },
  {
    id: 'sleep',
    question: 'What\'s your ideal morning?',
    options: [
      { value: 'early_bird', label: '🌅 Up at 5am with the birds', desc: 'Sunrise, chai, farm work' },
      { value: 'normal', label: '☀️ Up by 8am', desc: 'Relaxed start to the day' },
      { value: 'night_owl', label: '🌙 Morning? What morning?', desc: 'I come alive at night' },
    ]
  },
  {
    id: 'food',
    question: 'Food preferences?',
    options: [
      { value: 'veg', label: '🥗 Strictly vegetarian', desc: 'Pure veg please' },
      { value: 'nonveg', label: '🍗 Non-vegetarian', desc: 'I eat everything' },
      { value: 'flexible', label: '🍽️ Whatever the family eats', desc: 'I\'m adventurous!' },
    ]
  },
  {
    id: 'interest',
    question: 'What excites you most?',
    options: [
      { value: 'craft', label: '🏺 Learning a traditional craft', desc: 'Pottery, weaving, painting' },
      { value: 'nature', label: '🌿 Being in nature', desc: 'Farms, rivers, forests' },
      { value: 'culture', label: '🙏 Spiritual & cultural rituals', desc: 'Puja, festivals, ceremonies' },
      { value: 'food', label: '🍛 Cooking authentic food', desc: 'Learning family recipes' },
    ]
  },
  {
    id: 'pace',
    question: 'What\'s your ideal travel pace?',
    options: [
      { value: 'slow', label: '🐢 Slow & deep', desc: 'Stay 5+ days, go deep' },
      { value: 'medium', label: '🚶 Balanced', desc: '3-4 days feels right' },
      { value: 'fast', label: '🏃 Quick dip', desc: '1-2 days to experience it' },
    ]
  },
  {
    id: 'region',
    question: 'Which region calls to you?',
    options: [
      { value: 'north', label: '🏔️ North India', desc: 'Himalayas, rivers, plains' },
      { value: 'south', label: '🌴 South India', desc: 'Coastal, lush, classical' },
      { value: 'west', label: '🏜️ West India', desc: 'Desert, colour, crafts' },
      { value: 'east', label: '🌊 East India', desc: 'Tribal, temples, coast' },
    ]
  },
];

export default function VibeQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [matching, setMatching] = useState(false);
  const navigate = useNavigate();

  const current = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  const handleSelect = (value) => setSelected(value);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [current.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Quiz complete — trigger AI matching
      setMatching(true);
      // TODO: Send newAnswers to /api/ai/match
      // const res = await fetch('/api/ai/match', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ vibeProfile: newAnswers })
      // });
      setTimeout(() => navigate('/explore'), 2500);
    }
  };

  if (matching) {
    return (
      <div className="quiz-page">
        <div className="matching-screen">
          <div className="matching-spinner">🤖</div>
          <h2 className="matching-title">Finding your perfect families...</h2>
          <p className="matching-sub">Our AI is analyzing your vibe profile</p>
          <div className="matching-bar"><div className="matching-fill"></div></div>
          <div className="matching-tags">
            {Object.values(answers).map((a, i) => (
              <span key={i} className="matching-tag">{a}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {/* Progress */}
        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="quiz-step-count">{step + 1} of {QUESTIONS.length}</span>
        </div>

        {/* Question */}
        <div className="quiz-card">
          <div className="quiz-tag">Vibe Quiz 🧠</div>
          <h2 className="quiz-question">{current.question}</h2>

          <div className="quiz-options">
            {current.options.map(opt => (
              <button
                key={opt.value}
                className={`quiz-option ${selected === opt.value ? 'selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                <span className="option-label">{opt.label}</span>
                <span className="option-desc">{opt.desc}</span>
                {selected === opt.value && <span className="option-check">✓</span>}
              </button>
            ))}
          </div>

          <button
            className={`quiz-next ${selected ? 'active' : ''}`}
            onClick={handleNext}
            disabled={!selected}
          >
            {step === QUESTIONS.length - 1 ? '✨ Find My Families' : 'Next →'}
          </button>
        </div>

        {/* Answered so far */}
        {Object.keys(answers).length > 0 && (
          <div className="quiz-answered">
            {Object.entries(answers).map(([key, val]) => (
              <span key={key} className="answered-tag">✓ {val}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
