import jwt from 'jsonwebtoken';

export const signJwt = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyJwt = (token, secret) => {
  return jwt.verify(token, secret);
};

export const rotateRefreshToken = async (user) => {
  const newRefreshToken = signJwt({ id: user._id }, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRE);
  user.refreshToken = newRefreshToken;
  await user.save();
  return newRefreshToken;
};
