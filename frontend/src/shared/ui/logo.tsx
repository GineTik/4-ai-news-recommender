import { BotIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/constants";

export const Logo = () => {
  return (
    <Link href={ROUTES.HOME} className="flex items-center gap-2 text-secondary-foreground hover:bg-accent/10 px-1 rounded-sm transition-all">
      <BotIcon className="size-10" />
      <span className="text-2xl font-bold">NovynyAI</span>
    </Link>
  );
};
