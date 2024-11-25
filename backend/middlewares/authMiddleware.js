const Web3Token = require('web3-token');
require('dotenv').config();

const unauthorizedResponse = (res, message = 'Unauthorized') => res.status(401).send({ message });

const verifyToken = (token) => {
  try {
    const { address } = Web3Token.verify(token);
    return address;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};


exports.getAuthor = async (req, res, next) => {
  // const bearerToken = req.headers.authorization;
  // if (!bearerToken) return unauthorizedResponse(res);
  const secretKey = req.headers['x-origin-key']
  // if (!secretKey || secretKey != process.env.SECRET_KEY) return unauthorizedResponse(res);

  // const address = verifyToken(bearerToken);
  // if (!address || address.toLowerCase() !== process.env.AuthorAddress.toLowerCase()) {
  //   return unauthorizedResponse(res);

  

  // req.author = address;
  next();
};

exports.getUser = async (req, res, next) => {
  const secretKey = req.headers['x-origin-key']
  // if (!secretKey || secretKey != process.env.SECRET_KEY) return unauthorizedResponse(res);
  // const bearerToken = req.headers.authorization;
  // if (!bearerToken) return unauthorizedResponse(res);

  // const address = verifyToken(bearerToken);
  // if (!address) return unauthorizedResponse(res);

  // req.user = address;
  next();
};

exports.getRequest = async (req, res, next) => {
  const secretKey = req.headers['x-origin-key']
  // if (!secretKey || secretKey != process.env.SECRET_KEY) return unauthorizedResponse(res);
  // const bearerToken = req.headers.authorization;
  // if (!bearerToken) return unauthorizedResponse(res);

  // const address = verifyToken(bearerToken);
  // if (!address) return unauthorizedResponse(res);

  // req.user = address;
  next();
};
