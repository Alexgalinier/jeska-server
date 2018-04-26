export default ({ SECRET, ROLES }) => {
  if (!SECRET) throw new Error('No SECRET provided, Authentication will not be possible');

  return {
    secret: SECRET,
    roles: {
      users: {
        finances: ['*'],
        loginWithToken: ['GET'],
      },
    },
  };
};
