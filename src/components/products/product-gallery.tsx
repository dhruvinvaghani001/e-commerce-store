"use client";
import React, { useState } from "react";
import { Image as ImageType } from "@/types";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [activeTab, setActiveTab] = useState(`image-0`);

  return (
    <div className="mb-10">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="relative h-96 mb-8 overflow-hidden rounded-lg border-2 ">
          {images.map((image, index) => (
            <TabsContent
              key={image.id}
              value={`image-${index}`}
              className="h-full"
            >
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                layout="fill"
                loading="lazy"
                className="w-full h-full object-contain object-center"
              />
            </TabsContent>
          ))}
        </div>
        <TabsList className="flex gap-x-4 justify-start bg-transparent mt-4">
          {images.map((image, index) => (
            <TabsTrigger
              key={image.id}
              value={`image-${index}`}
              className={cn(
                "p-0 rounded-md overflow-hidden transition-all duration-200",
                activeTab === `image-${index}`
                  ? "ring-2 ring-black dark:ring-white ring-offset-2"
                  : "ring-1 ring-gray-200 hover:ring-gray-300"
              )}
            >
              <div className="w-20 h-20 relative rounded-md overflow-hidden">
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-center"
                />
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Gallery;
