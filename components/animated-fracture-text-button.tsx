import React from "react";

interface AnimatedFractureTextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const AnimatedFractureTextButton: React.FC<
  AnimatedFractureTextButtonProps
> = ({ children, ...props }) => {
  return (
    <>
      <button
        type="button"
        className="fracture-btn"
        data-heading={children}
        {...props}
      >
        {children}
      </button>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap");
        .fracture-btn {
          font-family: "Dela Gothic One", sans-serif;
          font-size: 2rem;
          font-weight: 900;
          text-transform: uppercase;
          color: black;
          position: relative;
          background: linear-gradient(transparent 50%, #000 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          padding: 1.5rem 3rem;
          border-radius: 9999px;
          background-color: #ffd600;
          box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          display: inline-block;
        }
        .fracture-btn:hover {
          transform: scale(1.05);
          background-color: #ffc107;
        }
        .fracture-btn::after {
          content: attr(data-heading);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(#000 50%, transparent 50%);
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
