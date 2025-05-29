"use client";

import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  LoadingButton,
} from "@/shared/ui";
import { FormField, Form } from "@/shared/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { useCategories } from "../news/use-categories";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import {
  getInterests,
  setInterests,
} from "@/shared/services/interests.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ROUTES } from "@/shared/constants";
import { ALL_CATEGORY } from "@/shared/constants/categories";
import { useRouter } from "next/navigation";

type FormValues = {
  interests: number[];
};

export const HomePage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      interests: [],
    },
  });

  useEffect(() => {
    form.reset({ interests: getInterests() });
  }, [form]);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = form.handleSubmit((data) => {
    setIsLoading(true);
    setTimeout(() => {
      setInterests(data.interests);
      setIsLoading(false);
      toast.success("Інтереси успішно збережено");
      router.push(ROUTES.NEWS(ALL_CATEGORY));
    }, 500);
  });

  return (
    <div className="h-screen max-w-[900px] mx-auto w-full mt-18 space-y-18">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 max-w-[40rem] mx-auto leading-snug">
          Ласкаво просимо до NovynyAI!
        </h1>
        <div className="w-1/3 h-1 bg-gradient-to-r from-secondary to-primary mb-4 mx-auto rounded-full"></div>
        <p className="max-w-3/4 mx-auto leading-normal text-muted-foreground text-xl">
          Давайте налаштуємо ваш особистий профіль, щоб наш ШІ міг надавати
          новини, які найбільше вас цікавлять. Це займе лише кілька хвилин
        </p>
      </div>
      <div className="text-center w-full">
        <form onSubmit={onSubmit}>
          <Card className="w-full p-10 space-y-4">
            <CardHeader>
              <CardTitle className="text-3xl">Оберіть ваші інтереси</CardTitle>
              <CardDescription className="text-muted-foreground mx-auto text-lg">
                Виберіть категорії, які вас цікавлять найбільше. Ви зможете
                змінити їх пізніше у налаштуваннях свого профілю.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <InterestsGrid form={form} />
            </CardContent>
            <CardFooter>
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="mx-auto"
                size="lg"
              >
                Продовжити
              </LoadingButton>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

const InterestsGrid = ({ form }: { form: UseFormReturn<FormValues> }) => {
  const categories = useCategories();

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.data?.map((category) => (
          <FormField
            key={category.name}
            name="interests"
            control={form.control}
            render={({ field }) => {
              const isSelected = field.value?.includes(category.id);
              return (
                <InterestCard
                  title={category.label ?? category.name}
                  description={category.description ?? ""}
                  icon={
                    category.lucideIconName && (
                      <DynamicIcon
                        name={
                          category.lucideIconName as keyof typeof dynamicIconImports
                        }
                        className="size-16"
                      />
                    )
                  }
                  isSelected={isSelected}
                  onClick={() => {
                    const currentInterests = field.value || [];
                    const newInterests = isSelected
                      ? currentInterests.filter(
                          (i: number) => i !== category.id
                        )
                      : [...currentInterests, category.id];
                    field.onChange(newInterests);
                  }}
                />
              );
            }}
          />
        ))}
      </div>
    </Form>
  );
};

type InterestCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
};

const InterestCard = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
}: InterestCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "bg-muted px-4 py-8 rounded-lg shadow-none flex flex-col items-center grow border-2 border-transparent text-secondary gap-2 hover:-translate-y-2 hover:shadow-md transition-all duration-200 cursor-pointer",
        isSelected && "border-secondary-2 bg-secondary-2/10"
      )}
    >
      <div className="mb-4">{icon}</div>
      <CardTitle className="text-lg font-bold">{title}</CardTitle>
      <CardDescription className="text-sm">{description}</CardDescription>
    </Card>
  );
};
