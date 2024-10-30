"use client";
import React, { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { IStory } from "@/services/stories";

import { StoriesCarousel } from "./stories-carousel";
import { Container } from "../container";
import { StoriesModal } from "./stories-modal";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }
    fetchStories();
  }, []);

  const onClickStory = (story: IStory, index: number) => {
    if (story.items.length > 0) {
      setCurrentStoryIndex(index);
      setOpen(true);
    } else {
      console.log("Эта сторис не содержит контента");
    }
  };

  return (
    <>
      <Container
        className={`flex items-center justify-between gap-2 my-10 ${className}`}
      >
        {stories.length > 0 && (
          <StoriesCarousel stories={stories} onClickStory={onClickStory} />
        )}
      </Container>

      {open && (
        <StoriesModal
          stories={stories}
          currentIndex={currentStoryIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
