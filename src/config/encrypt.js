export default ({ SALT_ROUNDS }) => ({
  saltRounds: SALT_ROUNDS ? SALT_ROUNDS : 10,
});
