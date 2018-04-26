import bcrypt from 'bcrypt';

let encryptConfig = {
  saltRounds: 10,
};

export const config = aConfig => {
  encryptConfig = { ...encryptConfig, ...aConfig };
};
export const hash = async password => {
  return await bcrypt.hash(password, encryptConfig.saltRounds);
};

export const verify = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (e) {}

  return false;
};
