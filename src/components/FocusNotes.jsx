import { useState } from "react";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";

const notes = [
  {
    title: "Plan your day",
    description:
      "Organise your priorities and focus on what matters most.",
    label: "DAILY PLANNING",
  },
  {
    title: "Stay consistent",
    description:
      "Small daily improvements lead to meaningful results.",
    label: "STAY PRODUCTIVE",
  },
  {
    title: "Celebrate progress",
    description:
      "Every completed task brings you one step closer to your goals.",
    label: "KEEP GOING",
  },
];

function FocusNotes() {
  const [activeSlide, setActiveSlide] = useState(0);

  const previousSlide = () => {
    setActiveSlide((current) =>
      (current - 1 + notes.length) % notes.length
    );
  };

  const nextSlide = () => {
    setActiveSlide((current) =>
      (current + 1) % notes.length
    );
  };

  const currentNote = notes[activeSlide];

  return (
    <section className="focus-notes">
      <div className="focus-notes-header">
        <div>
          <span className="notes-label">
            <Lightbulb size={17} />
            FOCUS NOTES · {activeSlide + 1} OF 3
          </span>
          <h3>{currentNote.title}</h3>
          <p>{currentNote.description}</p>
        </div>
      </div>

      <div className="notes-footer">
        <span>{currentNote.label}</span>

        <div className="carousel-controls">
          <button onClick={previousSlide} aria-label="Previous slide">
            <ArrowLeft size={18} />
          </button>

          {notes.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                activeSlide === index ? "active" : ""
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}

          <button onClick={nextSlide} aria-label="Next slide">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FocusNotes;
