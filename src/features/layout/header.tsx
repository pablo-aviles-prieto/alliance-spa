import { SammyLogo } from '@/assets/sammy-logo';
import { LayoutContentContainer } from '@/components/containers/content-layout';

export const LayoutHeader = () => {
  return (
    <header className='bg-primary'>
      <LayoutContentContainer className='flex h-[var(--header-height)] items-center justify-between'>
        <div>
          <SammyLogo />
        </div>
        <div>
          <input
            className='min-h-[30px] min-w-[270px] rounded-[20px] bg-[#F2F2F2] px-6'
            placeholder={`You're looking for something?`}
          />
        </div>
      </LayoutContentContainer>
    </header>
  );
};
