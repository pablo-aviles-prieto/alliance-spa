import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type PolymorphicAsProp<E extends ElementType> = {
  as?: E;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>
>;

const defaultElement = 'div';

type ContainerProps<E extends ElementType = typeof defaultElement> = PolymorphicProps<E> & {
  className?: string;
};

export const LayoutContentContainer = <E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  ...restProps
}: ContainerProps<E>) => {
  const Component = as ?? defaultElement;

  return (
    <Component {...restProps} className={cn('mx-auto max-w-[90%] lg:max-w-[80%]', className)}>
      {children}
    </Component>
  );
};
