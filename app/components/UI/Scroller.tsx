'use client';
import React, { useEffect, useRef, useState } from 'react'
import "@/app/ui/styles/ui-components/Scroller.scss";

const Scroller: React.FC = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [daysCount, setDaysCount] = useState(31);
  const [days, setDays] = useState<number[]>([]);
  const blockRef = useRef<HTMLDivElement>(null);
  const generateDaysArray = (count: number) => {
    for (let i = 0; i < count; i++) {
      days.push(i + 1);
    }
  }
  useEffect(() => {
    if (!isGenerated) {
      generateDaysArray(daysCount);
      setIsGenerated(true);
    }
  })

  const handleMouseScroll = (event: any) => {
    const scale = 1;

    const newScale = scale + event.deltaY * -0.01;
    const finalScale = Math.min(Math.max(0.125, newScale), 4);

    if (blockRef.current) {
      blockRef.current.style.transform = `translateY(${finalScale})`;
      console.log(finalScale);
    }
  }

  React.useEffect(() => {
    blockRef.current?.addEventListener("wheel", handleMouseScroll);
    return () => blockRef.current?.removeEventListener("wheel", handleMouseScroll);
  }, []);

  return (
    <div className="date-picker-container">
      <div className="date-picker-viewport">
        <div className="date-picker-wheel">
        </div>
      </div>
      <div className="date-picker-selection-line"></div>
    </div>
  )
}

export default Scroller;