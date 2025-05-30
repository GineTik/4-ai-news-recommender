import { ROUTES } from "@/shared/constants";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/ui";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import { Category } from "@/shared/business-logic";

type HeaderNavigationProps = {
  categories: Category[];
};

export const HeaderNavigation = ({ categories }: HeaderNavigationProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href={ROUTES.HOME}>
            <span>Головна</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span>Новини</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!w-[250px] [&_a]:hover:bg-accent [&_a]:flex-row [&_a]:items-center [&_a]:gap-2 [&_svg]:stroke-3 [&_a]:py-1.5">
            {categories.map((category) => (
              <NavigationMenuLink
                key={category.id}
                href={ROUTES.NEWS(category.name)}
              >
                {category.lucideIconName && (
                  <DynamicIcon
                    name={
                      (category.lucideIconName ??
                        "gallery-vertical-end") as keyof typeof dynamicIconImports
                    }
                    className="h-4 w-4 text-muted-foreground"
                  />
                )}
                <span>{category.label ?? category.name}</span>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
