"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { IStory } from "@/services/stories";
import { Container } from "./container";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import { StoriesCarousel } from "./stories-carousel";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory, index: number) => {
    // console.log("Clicked story:", story);
    setSelectedStory(story);
    setCurrentStoryIndex(index);
    if (story.items.length > 0) {
      setOpen(true);
    } else {
      console.warn("Эта сторис без контента");
    }
  };

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
    setSelectedStory(stories[(currentStoryIndex + 1) % stories.length]);
  };
  const prevStory = () => {
    setCurrentStoryIndex(
      (prev) => (prev - 1 + stories.length) % stories.length
    );
    setSelectedStory(
      stories[(currentStoryIndex - 1 + stories.length) % stories.length]
    );
  };

  return (
    <>
      <Container
        className={cn(
          "flex items-center justify-between gap-2 my-10",
          className
        )}
      >
        {stories.length > 0 && (
          <StoriesCarousel stories={stories} onClickStory={onClickStory} />
        )}

        {open && selectedStory && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: 520 }}>
              <button
                className="absolute -right-10 -top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                key={selectedStory.id}
                onAllStoriesEnd={() => setOpen(false)}
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
        )}
      </Container>
    </>
  );
};
