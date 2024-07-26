'use client';

import { useState } from 'react';
import { item as itemTable } from '../../db/schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../_components/ui/dialog';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { Button } from '../_components/ui/button';
import { useServerAction } from 'zsa-react';
import { claimItem } from './actions';
import { toast } from 'sonner';

const messages = {
  claimed: 'This item has already been claimed',
  probablyClaimed:
    'Seems like this item has already been claimed. Please refresh to verify',
  success: "Item successfully claimed! Don't forget to text me and let me know",
};

type ItemImageProps = {
  item: typeof itemTable.$inferSelect;
};
export const ItemImage = ({ item }: ItemImageProps) => {
  const { execute, isPending } = useServerAction(claimItem);
  const isClaimed = item.isClaimed;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeModalIfNotClaimed = (value: boolean) => {
    if (isClaimed) {
      setIsModalOpen(false);
      return;
    }
    setIsModalOpen(value);
  };

  const onClaimItem = async () => {
    if (isClaimed) {
      toast.error(messages.claimed);
      return;
    }
    const [, err] = await execute({
      id: item.id,
    });
    if (err) {
      toast.error(messages.probablyClaimed, {
        duration: 7000,
      });
    } else {
      toast.success(messages.success, {
        duration: 12000,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={changeModalIfNotClaimed}>
      <DialogTrigger asChild>
        <Image
          src={item.imageUrl}
          width={200}
          height="0"
          alt={item.title}
          className={cn(
            'w-full h-auto hover:outline-4 hover:outline-dotted hover:outline-gray-500 cursor-pointer',
            {
              'opacity-50': isClaimed,
            }
          )}
        />
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.title}</DialogTitle>
            <DialogDescription>
              {item.description ?? 'No description'}
            </DialogDescription>
          </DialogHeader>
          <Image
            src={item.imageUrl}
            width={200}
            height="0"
            alt={item.title}
            className={cn('w-full h-auto', {
              'opacity-50': isClaimed,
            })}
          />
          <div className="flex mt-1 items-center gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button loading={isPending} onClick={onClaimItem}>
              Claim
            </Button>
            <span className="text-gray-500 typography-muted">
              Completely anonymous
            </span>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
