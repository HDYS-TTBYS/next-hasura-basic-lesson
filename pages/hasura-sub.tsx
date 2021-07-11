import React, { VFC } from 'react';
import Link from 'next/link';
import {
  // useGetUsersQuery,
  useGetUsersLocalQuery,
} from '../types/generated/graphql';
import { Layout } from '../components/Layout';

const FetchSub: VFC = () => {
  const { data } = useGetUsersLocalQuery();
  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="mb-6 font-bold">Direct read out from cache</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        );
      })}
      <br />
      <Link href="/hasura-main">
        <a className="mb-6">Back</a>
      </Link>
    </Layout>
  );
};

export default FetchSub;
