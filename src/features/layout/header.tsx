import { SammyLogo } from '@/assets/sammy-logo';
import { LayoutContentContainer } from '@/components/containers/content-layout';

export const LayoutHeader = () => {
  return (
    <header className='bg-primary'>
      <LayoutContentContainer className='flex h-[var(--header-height)] items-center justify-between'>
        <div>
          <SammyLogo />
        </div>
        <div>Search input</div>
      </LayoutContentContainer>
    </header>
  );
};
