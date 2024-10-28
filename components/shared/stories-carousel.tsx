"use client";

import React, { useState } from "react";
import { IStory } from "@/services/stories";

interface StoriesCarouselProps {
  stories: IStory[];
  onClickStory: (story: IStory, index: number) => void;
}

const StoriesCarousel: React.FC<StoriesCarouselProps> = ({
  stories,
  onClickStory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 6; 
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
    );
  };

  const visibleStories = [
    ...stories.slice(currentIndex, currentIndex + visibleCards),
    ...stories.slice(
      0,
      Math.max(0, currentIndex + visibleCards - stories.length)
    ),
  ];

  return (
    <div className="relative flex items-center">
      <button
        onClick={prevSlide}
        className="absolute left-0 bg-gray-300 p-2 rounded-md"
      >
        ⟨
      </button>
      <div className="flex overflow-hidden gap-2 w-full justify-center">
        {visibleStories.map((story, index) => (
          <img
            key={story.id}
            src={story.previewImageUrl}
            alt="Story preview"
            className="w-[200px] h-[250px] rounded-md cursor-pointer"
            onClick={() => onClickStory(story, index)}
          />
        ))}
      </div>
      <button
        onClick={nextSlide}
        className="absolute right-0 bg-gray-300 p-2 rounded-md"
      >
        ⟩
      </button>
    </div>
  );
};

export default StoriesCarousel;
