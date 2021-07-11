import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { useCreateUserMutation } from '../types/generated/graphql';

export const useCreateForm = () => {
  const [text, settext] = useState('');
  const [username, setusername] = useState('');

  const [insert_user_one] = useCreateUserMutation({
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one);
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId, ...existingUsers)];
          },
        },
      });
    },
    // refetchQueries: [{ query: GetUsersDocument }],
  });
  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    settext(e.target.value);
  }, []);
  const usernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
  }, []);
  const printMsg = useCallback(() => {
    console.log('Hello');
  }, []);
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await insert_user_one({
          variables: {
            name: username,
          },
        });
      } catch (err) {
        alert(err.message);
      }
      setusername('');
    },
    [username]
  );
  return {
    text,
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    handleTextChange,
  };
};
