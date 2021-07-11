module.exports = {
  client: {
    service: {
      name: 'sample-graphql-app',
      url: 'https://hdys-lesson-hasura.hasura.app/v1/graphql',
    },
    includes: ['/queries//*.graphql'],
    excludes: ['**/__tests__/**'],
  },
};
