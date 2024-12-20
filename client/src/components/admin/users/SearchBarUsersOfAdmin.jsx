import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const searchOptions = [
  { value: 'fullname', label: 'Tên' },
  { value: 'phone', label: 'SĐT' },
  { value: 'email', label: 'Email' }
];

const SearchBarUsersOfAdmin = () => {
  const [searchType, setSearchType] = useState(searchOptions[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ [searchType]: searchQuery });
  };
  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl">
      <div className="flex w-full rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-[30%] px-4 py-2.5 bg-white border-r border-gray-300 text-gray-700 focus:outline-none"
        >
          {searchOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2.5 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 p-1.5 text-gray-500 hover:text-gray-700"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBarUsersOfAdmin;
