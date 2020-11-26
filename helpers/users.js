import jwt from "jsonwebtoken";

export const createToken = (user, secret, expiresIn) => {
  console.log(user);
  const { _id, email } = user;

  return jwt.sign({ _id, email }, secret, { expiresIn });
};
