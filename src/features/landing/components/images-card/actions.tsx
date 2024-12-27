import { useMutation } from '@tanstack/react-query';

import { LikeIcon } from '@/assets/icons/like';
import { ShareIcon } from '@/assets/icons/share';
import { copyToClipboard } from '@/features/landing/utils/copy-to-clipboard';
import { cn } from '@/lib/utils';
import graphqlRepository from '@/services/graphql-repository';

interface ImageActionsProps {
  likesCount: number;
  liked: boolean;
  imageId: string;
  imageUrl: string;
}

interface LikeSectionProps extends Omit<ImageActionsProps, 'imageUrl'> {
  className?: string;
}

export const LikeSection = ({ likesCount, liked, className, imageId }: LikeSectionProps) => {
  const { mutateAsync } = useMutation(graphqlRepository.mutateImageLikeOptions(imageId));

  return (
    <div className={cn('flex items-center justify-center gap-1 sm:flex-col', className)}>
      <p className='sm:order-1'>{likesCount}</p>
      <button
        onClick={() =>
          mutateAsync({ imageId, newLikesCount: liked ? likesCount - 1 : likesCount + 1 })
        }
      >
        <LikeIcon
          className={cn('size-6 text-red-400 hover:text-red-500', liked && 'fill-current')}
        />
      </button>
    </div>
  );
};

export const ShareSection = ({ imageUrl, className }: { imageUrl: string; className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center gap-1 sm:flex-col', className)}>
      <p className='sm:order-1'>0</p>
      <button onClick={() => copyToClipboard(imageUrl)}>
        <ShareIcon className='size-6' />
      </button>
    </div>
  );
};

export const ImageActions = ({ likesCount, liked, imageId, imageUrl }: ImageActionsProps) => {
  return (
    <>
      <div className='absolute bottom-0 left-0 h-[150px] w-full bg-gradient-to-t from-neutral-700 to-transparent opacity-0 transition-opacity sm:group-hover:opacity-50' />
      <div className='invisible absolute bottom-2 right-4 flex flex-col gap-y-3 text-white sm:group-hover:visible'>
        <LikeSection imageId={imageId} liked={liked} likesCount={likesCount} />
        <ShareSection imageUrl={imageUrl} />
      </div>
    </>
  );
};
