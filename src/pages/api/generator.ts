import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ id: uuid() });
}
