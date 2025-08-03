import React from "react";

function SliderText() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-[20vh] bg-black text-white overflow-hidden py-16">
        <div className="slide-text-wrapper w-full flex justify-center relative z-10">
          <div className="slide-text text-white select-none">
            <span>&nbsp;ОТДЫХАЙ КРАСИВО ОТДЫХАЙ КРАСИВО</span>
            <h1>&nbsp;ОТДЫХАЙ КРАСИВО ОТДЫХАЙ КРАСИВО&nbsp;</h1>
            <span>ОТДЫХАЙ КРАСИВО ОТДЫХАЙ КРАСИВО</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-transparent pointer-events-none" />
      </div>
    </>
  );
}
export default SliderText;
