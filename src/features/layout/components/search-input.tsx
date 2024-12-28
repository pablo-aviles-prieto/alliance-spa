import { SearchIcon } from '@/assets/icons/search';
import { XCircle } from '@/assets/icons/x-circle';

interface SearchInputProps {
  value: string;
  onChangeHandler: (value: string) => void;
}

export const HeaderSearchInput = ({ value, onChangeHandler }: SearchInputProps) => {
  return (
    <div className='mx-auto flex min-h-[30px] min-w-[275px] items-center justify-center gap-x-1 rounded-[20px] bg-[#F2F2F2] px-2 sm:mx-0'>
      <SearchIcon className='size-5 shrink-0' />
      <input
        type='text'
        className='w-full bg-inherit focus:outline-none'
        placeholder={`You're looking for something?`}
        value={value}
        onChange={e => onChangeHandler(e.target.value)}
      />
      {value && (
        <button onClick={() => onChangeHandler('')}>
          <XCircle className='size-5 shrink-0' />
        </button>
      )}
    </div>
  );
};
