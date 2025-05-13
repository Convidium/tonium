'use client';
import React, { useEffect, useRef, useState } from 'react'
import "@/app/ui/styles/ui-components/Scroller.scss";
import useDebouncedValue from '@/app/hooks/useDebouncedValue';

interface ScrollerProps {
  dataFrom: number;
  dataTo: number;
  currentValue: string;
  onValueChange: (value: string) => void;
  debounceDelay?: number;
}

const Scroller: React.FC<ScrollerProps> = ({ dataFrom, dataTo, currentValue, onValueChange, debounceDelay = 1000 }) => {
  const itemHeight = 30;
  const [dataArr, setDataArr] = useState<string[]>([]);
  const [centralItem, setCentralItem] = useState<number>(Number(currentValue));
  const blockRef = useRef<HTMLDivElement>(null);

  const debouncedCentralItem = useDebouncedValue(centralItem, debounceDelay);

  const generateDataArray = (generateFrom: number, generateTo: number) => {
    const newArr = [];
    for (let i = generateFrom; i <= generateTo; i++) {
      newArr.push(`${i}`);
    }
    setDataArr(newArr);
  }

  useEffect(() => {
    generateDataArray(dataFrom, dataTo);
  }, [dataFrom, dataTo]);

  useEffect(() => {
      const numericValue = Number(currentValue);
      if (!isNaN(numericValue)) {
          setCentralItem(numericValue);
      }
  }, [currentValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(debouncedCentralItem.toString());
    }
  }, [debouncedCentralItem, onValueChange]);

  useEffect(() => {
    const handleMouseScroll = (event: WheelEvent) => {
      setCentralItem(prevCentralItem => {
        const newCentralItem = prevCentralItem + event.deltaY * 0.01;

        const firstItem = dataFrom;
        const lastItem = dataTo;
        return Math.max(firstItem, Math.min(lastItem, newCentralItem));
      });
    }

    const blockElement = blockRef.current;

    if (blockElement) {
      blockElement.addEventListener("wheel", handleMouseScroll);
    }

    return () => {
      if (blockElement) {
        blockElement.removeEventListener("wheel", handleMouseScroll);
      }
    };

  }, [dataFrom, dataTo, currentValue]);

  const RenderedElements = () => {
    const centralItemIndex = centralItem - dataFrom;

    return dataArr.map((value: string, i: number) => {
      const itemValue = parseInt(value, 10);

      const distance = Math.abs(itemValue - centralItem);

      let className = 'datepicker-item inactive';

      if (distance === 0) {
        className = 'datepicker-item active';
      } else if (distance === 1) {
        className = 'datepicker-item half-active';
      } else if (distance === 2) {
        className = 'datepicker-item quarter-active';
      }

      return <div key={i} className={className}>{value}</div>
    })
  }

  const transformStyle = {
    transform: `translateY(calc(${itemHeight}px * ${-(centralItem - dataFrom - 2)}))`
  };

  return (
    <div className="date-picker-container" ref={blockRef}>
      <div className="date-picker-viewport">
        <div className="date-picker-wheel" style={transformStyle}>
          <RenderedElements />
        </div>
      </div>
      <div className="date-picker-selection-line"></div>
    </div>
  )
}

export default Scroller;