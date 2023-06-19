import type { VercelRequest, VercelResponse } from '@vercel/node'
import urllib from 'urllib';

const REGISTRY = 'https://registry.npmmirror.com';

const WidthMap = {
  // 'm': 100,
  // 'w': 80,
  // 'knopqsuvxyz': 60,
  // 'abcdegh': 50,
  // 'fjrt': 40,
  // 'il': 20,
  "lij|' ": 40.0,
  '![]fI.,:;/\\t': 50.0,
  '`-(){}r"': 60.0,
  '*^zcsJkvxy': 70.0,
  'aebdhnopqug#$L+<>=?_~FZT0123456789': 70.0,
  'BSPEAKVXY&UwNRCHD': 70.0,
  'QGOMm%W@': 100.0,
} as const;

function getTextWidth(str: string) {
  let len = 10;
  str.split('').forEach(s => {
    const key = Object.keys(WidthMap).find(item => {
      return item.includes(s);
    });
    len += WidthMap[key!] || 110;
  });
  return len;
}

function render(title: string, value: string) {
  const titleTextWidth = getTextWidth(title);
  const valueTextWidth = getTextWidth(value);
  const titleConWidth = titleTextWidth / 10 + 10;
  const valueConWidth = valueTextWidth / 10 + 10;
  const totalWidth = titleConWidth + valueConWidth;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="20" role="img"
    aria-label="javascript: |">
    <linearGradient id="s" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
      <stop offset="1" stop-opacity=".1" />
    </linearGradient>
    <clipPath id="r">
      <rect width="${totalWidth}" height="20" rx="3" fill="#fff" />
    </clipPath>
    <g clip-path="url(#r)">
      <rect width="${titleConWidth}" height="20" fill="#555" />
      <rect x="${titleConWidth}" width="${valueConWidth}" height="20" fill="#007ec6" />
      <rect width="${totalWidth}" height="20" fill="url(#s)" />
    </g>
    <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
      <text x="${titleTextWidth / 2 +
        65}" y="140" transform="scale(.1)" fill="#fff" textLength="${titleTextWidth}">${title}</text>
      <text x="${valueTextWidth / 2 +
        titleConWidth * 10 +
        50}" y="140" transform="scale(.1)" fill="#fff" textLength="${valueTextWidth}">${value}</text>
    </g>
  </svg>
  `;
}


export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.url || '';
  const targetVersion = await urllib.request(`${REGISTRY}${url}`, {
    dataType: 'json',
  });

  const { name, version } = targetVersion.data;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(render(name, version));
}
