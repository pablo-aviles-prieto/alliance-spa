import { LayoutContentContainer } from '@/components/containers/content-layout';
import { LayoutHeader } from '@/features/layout/header';
import { FetchData } from '@/fetch';

const App = () => {
  return (
    <>
      <LayoutHeader />
      <main className='bg-secondary'>
        <LayoutContentContainer className='min-h-[calc(100vh-var(--header-height))]'>
          <FetchData />
        </LayoutContentContainer>
      </main>
    </>
  );
};

export default App;
