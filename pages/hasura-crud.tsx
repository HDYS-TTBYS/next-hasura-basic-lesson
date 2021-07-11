import React, { VFC, useState, FormEvent } from 'react';
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
  // GetUsersDocument,
  useDeleteUserMutation,
} from '../types/generated/graphql';
import { Layout } from '../components/Layout';
import UserItem from '../components/UserItem';
import { StoreObject, Reference } from '@apollo/client';

const HasuraCRUD: VFC = () => {
  const [editedUser, seteditedUser] = useState({ id: '', name: '' });
  const { data, error } = useGetUsersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [update_user_by_pk] = useUpdateUserMutation();
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
  const [delete_user_by_pk] = useDeleteUserMutation({
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user: StoreObject | Reference) =>
                delete_users_by_pk.id !== readField('id', user)
            );
          },
        },
      });
    },
    // refetchQueries: [{ query: GetUsersDocument }],
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedUser.id) {
      try {
        await update_user_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        });
      } catch (error) {
        alert(error.message);
      }
      seteditedUser({ id: '', name: '' });
    } else {
      try {
        await insert_user_one({
          variables: {
            name: editedUser.name,
          },
        });
      } catch (error) {
        alert(error.message);
      }
      seteditedUser({ id: '', name: '' });
    }
  };

  if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>;
  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          value={editedUser.name}
          onChange={(e) =>
            seteditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>

      {data?.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            user={user}
            setEditedUser={seteditedUser}
            delete_user_by_pk={delete_user_by_pk}
          />
        );
      })}
    </Layout>
  );
};

export default HasuraCRUD;
