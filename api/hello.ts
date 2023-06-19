import type { VercelRequest, VercelResponse } from '@vercel/node'
import urllib from 'urllib';

const REGISTRY = 'https://registry.npmmirror.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.url || '';
  const targetVersion = await urllib.request(`${REGISTRY}${url}`, {
    dataType: 'json',
  });

  return res.json(targetVersion.data);

  // res.setHeader('Content-Type', 'image/svg+xml');
  // return res.send(`
  // <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="118" height="20" role="img"
  //   aria-label="javascript: |">
  //   <linearGradient id="s" x2="0" y2="100%">
  //     <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
  //     <stop offset="1" stop-opacity=".1" />
  //   </linearGradient>
  //   <clipPath id="r">
  //     <rect width="118" height="20" rx="3" fill="#fff" />
  //   </clipPath>
  //   <g clip-path="url(#r)">
  //     <rect width="69" height="20" fill="#555" />
  //     <rect x="69" width="49" height="20" fill="#007ec6" />
  //     <rect width="118" height="20" fill="url(#s)" />
  //   </g>
  //   <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
  //     <text x="360" y="140" transform="scale(.1)" fill="#fff" textLength="590">cnpmcore</text>
  //     <text x="935" y="140" transform="scale(.1)" fill="#fff" textLength="390">3.34.3</text>
  //   </g>
  // </svg>
  // `);
}
