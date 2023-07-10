const { JWT_SECRET = 'some-secret-key' } = process.env;
const { NODE_ENV = 'production' } = process.env;
const { MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const { PORT = 3000 } = process.env;

export {
  PORT, MONGO_URL, NODE_ENV, JWT_SECRET,
};
