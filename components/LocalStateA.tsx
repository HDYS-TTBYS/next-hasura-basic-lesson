import { useState, VFC } from 'react';
import { todoVar } from '../cache';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';

export const LocalStateA: VFC = () => {
  const [input, setinput] = useState('');
  const todos = useReactiveVar(todoVar);

  return (
    <>
      <p className="mb-3 font-bold">makeVar A</p>
      {todos?.map((task, index) => {
        return (
          <p className="mb-3 y-1" key={index}>
            {task.title}
          </p>
        );
      })}
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          todoVar([...todoVar(), { title: input }]);
          setinput('');
        }}
      >
        <input
          type="text"
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New task ?"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <button
          disabled={!input}
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
        >
          Add new state
        </button>
      </form>
      <Link href="/local-state-b">
        <a>Next</a>
      </Link>
    </>
  );
};
