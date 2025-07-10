import React, { useRef } from "react";

interface AnimatedFractureTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const AnimatedFractureText: React.FC<AnimatedFractureTextProps> = ({
  children,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleInput = (e: React.FormEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.setAttribute("data-heading", el.innerText);
    if (props.onInput) props.onInput(e);
  };

  return (
    <>
      <button
        ref={btnRef}
        // contentEditable
        data-heading={children}
        className="fracture-h1"
        suppressContentEditableWarning
        onInput={handleInput}
        {...props}
      >
        {children}
      </button>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap");
        .fracture-h1 {
          font-family: "Dela Gothic One", sans-serif;
          font-size: calc(5vw + 0.2rem);
          font-weight: 900;
          text-transform: uppercase;
          color: white;
          position: relative;
          background: linear-gradient(transparent 50%, white 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          outline: none;
          border: none;
          text-align: center;
        }
        .fracture-h1::after {
          content: attr(data-heading);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: linear-gradient(white 50%, transparent 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transform: translate(0px, -2px);
          animation: fracture 5s infinite ease;
          pointer-events: none;
        }
        @keyframes fracture {
          0% {
            transform: translate(0, -2px);
          }
          50% {
            transform: translate(-20px, -2px);
          }
          100% {
            transform: translate(0, -2px);
          }
        }
      `}</style>
    </>
  );
};
