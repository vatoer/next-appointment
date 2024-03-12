"use client";
import Link from "next/link";
import * as React from "react";

import { getServiceByCategory } from "@/app/(public)/service/_data/service";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Category, Service } from "@/prisma/db-appointment/generated/client";
import { Home } from "lucide-react";

interface ITopNavigationMenuProps {
  categories: Array<
    Category & {
      services: Array<Service>;
    }
  >;
}

export const TopNavigationMenu = ({ categories }: ITopNavigationMenuProps) => {
  return (
    <NavigationMenu delayDuration={0} className="bg-transparent">
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="bg-transparent hover:bg-transparent focus:bg-transparent hover:underline">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Navigation base on Service categories */}
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent hover:underline px-1">
              {category.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {category.services.map((service) => (
                  <ListItem
                    key={service.id}
                    title={service.name}
                    href={`/service/${service.id}`}
                  >
                    {service.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <Link href="/booked-service" legacyBehavior passHref>
            <NavigationMenuLink className="bg-transparent hover:bg-transparent focus:bg-transparent hover:underline">
              Booked
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
