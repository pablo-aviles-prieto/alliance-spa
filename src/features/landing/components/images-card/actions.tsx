import { useMutation } from '@tanstack/react-query';

import { LikeIcon } from '@/assets/icons/like';
import { ShareIcon } from '@/assets/icons/share';
import { cn } from '@/lib/utils';
import graphqlRepository from '@/services/graphql-repository';

interface ImageActionsProps {
  likesCount: number;
  liked: boolean;
  imageId: string;
}

interface LikeSectionProps extends ImageActionsProps {
  className?: string;
}

export const LikeSection = ({ likesCount, liked, className, imageId }: LikeSectionProps) => {
  const { mutateAsync } = useMutation(graphqlRepository.mutateImageLikeOptions(imageId));

  return (
    <div className={cn('flex items-center justify-center gap-1 sm:flex-col', className)}>
      <p className='sm:order-1'>{likesCount}</p>
      <button onClick={() => mutateAsync()}>
        <LikeIcon
          className={cn('size-6 text-red-400 hover:text-red-500', liked && 'fill-current')}
        />
      </button>
    </div>
  );
};

export const ShareSection = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center gap-1 sm:flex-col', className)}>
      <p className='sm:order-1'>0</p>
      <button onClick={() => console.log('click')}>
        <ShareIcon className='size-6' />
      </button>
    </div>
  );
};

export const ImageActions = ({ likesCount, liked, imageId }: ImageActionsProps) => {
  return (
    <div className='invisible absolute bottom-2 right-4 flex flex-col gap-y-3 text-white sm:group-hover:visible'>
      <LikeSection imageId={imageId} liked={liked} likesCount={likesCount} />
      <ShareSection />
    </div>
  );
};
