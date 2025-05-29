import { Logo } from "@/shared/ui";
import { HeaderNavigation } from "./navigation";
import { useCategories } from "@/features/news/use-categories";

export const Header = () => {
  const categories = useCategories();

  return (
    <header className="py-4 px-8 flex items-center gap-4 w-full bg-gradient-to-r from-secondary to-secondary-2">
      <Logo />
      <HeaderNavigation categories={categories.data ?? []} />
    </header>
  );
};
