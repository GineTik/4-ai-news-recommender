"use client";

import { cn } from "@/shared/lib/utils";
import {
  News,
  unlikeNews,
  likeNews,
  removeBookmark,
  addBookmark,
} from "@/shared/services";
import { Card, Button, CardTitle, CardContent, CardFooter } from "@/shared/ui";
import { ExternalLinkIcon, HeartIcon, BookmarkIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/shared/ui";
import Link from "next/link";

type NewsCardProps = {
  isDefaultBookmarked?: boolean;
  className?: string;
  news: News;
  isDefaultLiked: boolean;
};

export const NewsCard = ({
  isDefaultBookmarked,
  className,
  news,
  isDefaultLiked,
}: NewsCardProps) => {
  const [isLiked, setIsLiked] = useState(isDefaultLiked);
  const [isBookmarked, setIsBookmarked] = useState(isDefaultBookmarked);

  return (
    <Card
      className={cn("flex flex-col md:flex-row shadow-none p-0", className)}
    >
      {news.image ? (
        <div className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-auto bg-muted">
          <Image
            src={news.image}
            alt={news.title}
            className="object-cover w-full h-full rounded-xl"
            fill
          />
        </div>
      ) : (
        <div className="w-full md:w-1/3 bg-muted flex items-center justify-center p-4 aspect-[4/3] md:aspect-auto rounded-lg">
          <span className="text-muted-foreground text-sm">News thumbnail</span>
        </div>
      )}

      <div className="flex flex-col flex-1 py-4 md:py-6 space-y-4">
        {news.complianceScore !== undefined && (
          <Badge
            variant={
              news.complianceScore >= 70
                ? "super"
                : news.complianceScore >= 30
                ? "normal"
                : "bad"
            }
          >
            Відповідність вашим інтресам: {" " + news.complianceScore} із 100
          </Badge>
        )}

        <div className="flex items-center text-xs text-muted-foreground gap-4">
          <span className="text-secondary font-medium text-sm">
            {news?.categories
              ?.map((category) => category.label ?? category.name)
              .join(", ")}
          </span>
          <span>
            {news.publishedAt
              ? new Date(news.publishedAt).toLocaleString("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "Date not available"}
          </span>
          <Button
            variant="link"
            asChild
            className="!p-0 text-xs h-4 gap-1 items-center"
          >
            <Link href={news.source?.homepageUrl ?? ""} target="_blank">
              {news.source?.name}
              <ExternalLinkIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <CardTitle className="text-xl lg:text-xl font-semibold leading-tight hover:text-primary transition-colors">
          <a
            href={news?.originalUrl ?? ""}
            target="_blank"
            className="hover:underline cursor-pointer"
          >
            {news.title}
          </a>
        </CardTitle>

        <CardContent className="p-0 text-base text-muted-foreground flex-grow">
          <p className="line-clamp-3">{news.description}</p>
        </CardContent>

        <CardFooter className="p-0 flex items-center text-sm text-muted-foreground gap-2">
          <NewsCardAction
            icon={<HeartIcon className="w-4 h-4" />}
            isActive={isLiked}
            label={isLiked ? "Сподобалось" : "Подобається"}
            onClick={() => {
              if (isLiked) {
                unlikeNews(news.id);
                setIsLiked(false);
              } else {
                likeNews(news.id);
                setIsLiked(true);
              }
            }}
          />
          <NewsCardAction
            icon={<BookmarkIcon className="w-4 h-4" />}
            label={isBookmarked ? "Збережено" : "Зберегти"}
            isActive={isBookmarked}
            onClick={() => {
              if (isBookmarked) {
                removeBookmark(news.id);
                setIsBookmarked(false);
              } else {
                addBookmark(news.id);
                setIsBookmarked(true);
              }
            }}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

type NewsCardActionProps = {
  icon: React.ReactNode;
  count?: number;
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
};

const NewsCardAction = ({
  icon,
  count,
  label,
  isActive,
  onClick,
}: NewsCardActionProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-1 transition-transform border px-2 py-1 rounded-full cursor-pointer active:scale-95",
        isActive && "bg-primary text-primary-foreground border-primary",
        !isActive &&
          "hover:bg-primary/10 hover:border-primary hover:text-primary"
      )}
      onClick={onClick}
    >
      {icon}
      {count && <span>{count}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};
