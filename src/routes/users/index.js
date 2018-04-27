import * as Encrypt from './../../shared/encrypt';

export default ({ post, config }) => {
  post('users', async (req, res) => {
    const { username, password } = req.data;
    const { db, maxUsersCount } = config;

    if (!username || !password) return res.error(400, 'You must provide a username and password value');

    const usersCount = await db.count('users');
    console.log('users count', usersCount, maxUsersCount);
    if (usersCount && usersCount === maxUsersCount) return res.error(403);

    const user = await db.find('users', 'username', username);

    if (user) return res.error(409, `Username: ${username}, already exists`);

    const hashedPassword = await Encrypt.hash(password);
    const newUser = await db.insert('users', { username, hash: hashedPassword, role: 'users' });

    res.send({ username: newUser.username, _id: newUser._id, role: newUser.role }, 201);
  });
};
