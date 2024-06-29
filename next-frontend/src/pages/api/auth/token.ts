// pages/api/auth/token.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
