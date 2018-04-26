import * as Auth from './../../shared/auth';
import * as Encrypt from './../../shared/encrypt';

export default ({ get, post, config }) => {
  post('login', async (req, res) => {
    const { username, password } = req.data;
    const { db, secret } = config;

    if (!username || !password) return res.error(400, 'You must provide a username and password value');

    const user = await db.find('users', 'username', username);

    if (!user) return res.error(403);

    if (!await Encrypt.verify(password, user.hash)) return res.error(403);

    res.send({
      token: Auth.token({
        _id: user._id,
        username: user.username,
        role: 'users',
      }),
    });
  });
  get('loginWithToken', async (req, res) => {
    if (Auth.check(req)) return res.ok();
    res.error(401);
  });
};
