import { ImageFieldsFragment } from '@/graphql/graphql';

export const imageFieldsTypeGuard = (node: unknown): node is ImageFieldsFragment => {
  return (node as ImageFieldsFragment)?.id !== undefined;
};
