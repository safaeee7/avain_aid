import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, SearchIcon } from './Icons';

interface FilterDropdownProps<T extends string> {
  title: string;
  options: readonly T[];
  selectedOptions: T[];
  onChange: (selected: T[]) => void;
  searchable?: boolean;
}

const FilterDropdown = <T extends string>({ title, options, selectedOptions, onChange, searchable = false }: FilterDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionToggle = (option: T) => {
    const currentSelected = selectedOptions || [];
    const newSelectedOptions = currentSelected.includes(option)
      ? currentSelected.filter(item => item !== option)
      : [...currentSelected, option];
    onChange(newSelectedOptions);
  };

  const filteredOptions = searchable
    ? options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const currentSelectedOptions = selectedOptions || [];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-left focus:outline-none focus:ring-2 focus:ring-[#8A9B6C]"
      >
        <span className="text-gray-700">
          {title} {currentSelectedOptions.length > 0 && `(${currentSelectedOptions.length})`}
        </span>
        <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchable && (
            <div className="p-2 border-b sticky top-0 bg-white">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-green-50 border border-green-200 text-gray-800 placeholder-gray-500 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8A9B6C]/50 focus:border-[#8A9B6C]"
                />
              </div>
            </div>
          )}
          <ul className="py-1">
            {filteredOptions.map(option => (
              <li key={option} className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer">
                <label className="flex items-center space-x-3 w-full">
                  <input
                    type="checkbox"
                    checked={currentSelectedOptions.includes(option)}
                    onChange={() => handleOptionToggle(option)}
                    className="h-4 w-4 rounded border-gray-300 text-[#8A9B6C] focus:ring-[#8A9B6C]"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;