"use client";

import { QRCodeCanvas } from "qrcode.react";

type Props = {
  slug?: string | null;
};

export default function QRCodeMaker({ slug }: Props) {
  if (!slug) return null;

  const url = `http://localhost:3000/${slug}`;

  return (
    <div className="inline-flex flex-col items-center gap-3 rounded-xl bg-white p-4 shadow-md">
      <QRCodeCanvas value={url} size={220} includeMargin />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-sm text-blue-600 underline hover:text-blue-800"
      >
        {url}
      </a>
    </div>
  );
}
