"use client";

import { useCallback, useMemo, useState } from "react";

export type CubeItem = {
  title: string;
  description: string;
  accent: string;
};

const SWIPE_POWER = 650;

function wrapIndex(value: number, length: number) {
  if (length === 0) return 0;
  return ((value % length) + length) % length;
}

export function useCubeCarousel(items: CubeItem[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(wrapIndex(index, items.length));
    },
    [items.length]
  );

  const goNext = useCallback(() => {
    setActiveIndex((current) => wrapIndex(current + 1, items.length));
  }, [items.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => wrapIndex(current - 1, items.length));
  }, [items.length]);

  const onDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const swipe = Math.abs(info.offset.x) * info.velocity.x;
      if (swipe < -SWIPE_POWER) {
        goNext();
        return;
      }
      if (swipe > SWIPE_POWER) {
        goPrev();
      }
    },
    [goNext, goPrev]
  );

  const visibleOrder = useMemo(() => {
    return items.map((item, idx) => {
      const rawOffset = idx - activeIndex;
      const normalizedOffset =
        rawOffset > items.length / 2
          ? rawOffset - items.length
          : rawOffset < -items.length / 2
            ? rawOffset + items.length
            : rawOffset;

      return { item, idx, offset: normalizedOffset };
    });
  }, [activeIndex, items]);

  return {
    activeIndex,
    goTo,
    goNext,
    goPrev,
    onDragEnd,
    visibleOrder,
  };
}
