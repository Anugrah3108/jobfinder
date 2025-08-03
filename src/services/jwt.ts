//@ts-nocheck
import jwt from "jsonwebtoken";
export function createToken(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
}

export function verifyToken(token) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
