import React, { useState } from "react";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import { IStory } from "@/services/stories";

interface StoryModalProps {
  stories: IStory[];
  currentIndex: number;
  onClose: () => void;
}

export const StoriesModal: React.FC<StoryModalProps> = ({
  stories,
  currentIndex,
  onClose,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(currentIndex);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex(
      (prev) => (prev - 1 + stories.length) % stories.length
    );
  };

  const selectedStory = stories[currentStoryIndex];

  return (
    <div
      className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30"
      onClick={onClose}
    >
      <div
        className="relative"
        style={{ width: 520 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute -right-10 -top-5 z-30" onClick={onClose}>
          <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
        </button>

        <ReactStories
          key={selectedStory.id}
          onAllStoriesEnd={onClose}
          stories={selectedStory.items.map((item) => ({
            url: item.sourceUrl,
          }))}
          defaultInterval={3000}
          width={520}
          height={700}
        />

        <button
          onClick={prevStory}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-md"
        >
          ⋖
        </button>
        <button
          onClick={nextStory}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-md"
        >
          ⋗
        </button>
      </div>
    </div>
  );
};
