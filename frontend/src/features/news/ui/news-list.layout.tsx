import { ROUTES } from "@/shared/constants";
import { ALL_CATEGORY } from "@/shared/constants/categories";
import { Button, Card, CardHeader, CardTitle } from "@/shared/ui";
import Link from "next/link";

type NewsListLayoutProps = {
  listSlot: React.ReactNode;
  filtersSlot: React.ReactNode;
};

export const NewsListLayout = ({
  listSlot,
  filtersSlot,
}: NewsListLayoutProps) => {
  return (
    <div className="my-10">
      <Card className="max-w-[900px] mx-auto w-full divide-border divide-y *:px-6 *:py-4 py-0 gap-0">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl">Останні новини</CardTitle>
          <Button variant="link" asChild className="text-base">
            <Link href={ROUTES.NEWS(ALL_CATEGORY)}>Всі новини</Link>
          </Button>
        </CardHeader>
        {filtersSlot}
        <div className="flex flex-col gap-4">{listSlot}</div>
      </Card>
    </div>
  );
};
