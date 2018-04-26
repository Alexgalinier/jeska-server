export default (values, matchers) => {
  const resKey = Object.keys(matchers).filter(_ => _ === val);

  if (resKey.length > 1) {
    throw new Error('Multiple matching solution [', resKey.join(', '), '] for ', val);
  }

  let res;
  if (resKey.length === 0) {
    res = matchers['default'];
  } else {
    res = matchers[resKey[0]];
  }

  if (typeof res === 'function') return res.apply(null);
  return res;
};
