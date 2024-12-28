export const SkeletonImagesCard = () => {
  return (
    <div className='group mx-auto size-full animate-pulse'>
      <header className='relative'>
        <div className='h-[360px] w-full bg-gray-200'></div>
      </header>
      <footer>
        <div className='flex h-[100px] flex-col items-center justify-center border border-soft-gray px-2'>
          <div className='h-6 w-2/3 rounded bg-gray-200'></div>
          <div className='mt-1 h-4 w-1/2 rounded bg-gray-200'></div>
        </div>
        <div className='flex h-14 border border-t-0 border-soft-gray sm:hidden'>
          <div className='flex w-full items-center justify-center gap-1 border-r border-soft-gray sm:flex-col'>
            <div className='h-6 w-1/2 rounded bg-gray-200'></div>
          </div>
          <div className='flex w-full items-center justify-center gap-1 sm:flex-col'>
            <div className='h-6 w-1/2 rounded bg-gray-200'></div>
          </div>
        </div>
      </footer>
    </div>
  );
};
