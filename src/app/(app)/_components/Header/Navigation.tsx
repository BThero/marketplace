'use client';

import NextLink from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/_components/ui/navigation-menu';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type LinkProps = {
  href: string;
  children?: ReactNode;
};
const Link = ({ href, ...props }: LinkProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <NavigationMenuLink
      asChild
      active={isActive}
      className={navigationMenuTriggerStyle()}
    >
      <NextLink href={href} className="NavigationMenuLink" {...props} />
    </NavigationMenuLink>
  );
};

export const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/">Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/history">History</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
