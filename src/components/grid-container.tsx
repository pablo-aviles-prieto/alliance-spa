interface GridContainerProps {
  children: React.ReactNode;
}

export const GridContainer = ({ children }: GridContainerProps) => {
  return (
    <div className='grid grid-cols-auto-fit-300 gap-8 md:grid-cols-auto-fill-300'>{children}</div>
  );
};
