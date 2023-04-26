// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const contentDir = path.join(process.cwd(), '/content');
  const datasets = await fs.readdir(contentDir);
  const query = req.query;
  const { fileName } = query;
  const dataFile = path.join(
    process.cwd(),
    '/content/' + datasets[0] + '/' + fileName
  );
  const data = await fs.readFile(dataFile, 'utf8');
  res.status(200).send(data)
}
