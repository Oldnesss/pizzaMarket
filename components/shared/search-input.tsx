import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex rounded-2xl flex-1 justify-between relative h-11">
     <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"/>
     <input type="text" className="rounded-2xl outline-none w-full bg-gray-50 pl-11" placeholder='Найти пиццу' />



    </div>
  );
};