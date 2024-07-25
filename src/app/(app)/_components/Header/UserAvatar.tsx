'use client';

import { LogOut, Settings } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../_components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../_components/ui/dropdown-menu';
import { User } from 'lucia';
import { logout } from '../../../actions/logout';

type UserAvatarProps = {
  user: User;
};
export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback delayMs={600}>?</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
