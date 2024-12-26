export const PriceBadge = ({ price }: { price: string }) => {
  return (
    <div className='absolute left-0 top-0'>
      <div className='relative size-0 border-r-[120px] border-t-[120px] border-r-transparent border-t-white'>
        <span className='absolute left-0 top-[-90px] line-clamp-1 w-16 text-center text-sm'>
          {price} €
        </span>
      </div>
    </div>
  );
};
