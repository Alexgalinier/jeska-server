import * as Auth from './../../shared/auth';
import * as Rest from './../../shared/rest';

export default ({ all, get, post, put, _delete, config }) => {
  all('finances', Auth.check);
  get('finances', async (req, res) => {
    const result = await config.db.find('finances', 'owner', req.authData._id);
    result ? res.send(result) : res.error(404);
  });
  post('finances', async (req, res) => {
    const result = await config.db.insert('finances', {
      owner: req.authData._id,
      data: req.data,
    });
    result ? res.send(result, 201) : res.error(404);
  });
  put('finances', async (req, res) => {
    const finance = await config.db.find('finances', 'owner', req.authData._id);
    if (!finance) return res.error(404);

    const result = await config.db.update('finances', finance._id, { data: req.data }, true);
    result ? res.send(result, 200) : res.error(404);
  });
};
