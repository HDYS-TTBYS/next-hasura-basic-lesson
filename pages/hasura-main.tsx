import { VFC } from 'react';
import Link from 'next/link';
import { useGetUsersQuery } from '../types/generated/graphql';
import { Layout } from '../components/Layout';

const FetchMain: VFC = () => {
  const { data, error } = useGetUsersQuery({
    // fetchPolicy: 'network-only',
    fetchPolicy: 'cache-and-network',
    // fetchPolicy: 'cache-first',
    // fetchPolicy: 'no-cache',
  });
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    );
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        );
      })}
      <br />
      <Link href="/hasura-sub">
        <a className="mb-6">Next</a>
      </Link>
    </Layout>
  );
};

export default FetchMain;
