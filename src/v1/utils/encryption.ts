import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';

const secret_key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, secret_key, iv);

  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

export const decrypt = (hash: string) => {
  const decipher = crypto.createDecipheriv(algorithm, secret_key, iv);

  let decrypted = decipher.update(hash, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
};
