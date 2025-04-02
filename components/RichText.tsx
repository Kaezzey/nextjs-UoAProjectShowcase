'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';

type RichTextProps = {
  value: any; // This should be your blockContent field (e.g., post.content)
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      // Use Sanity CDN URL if you're not resolving the asset manually
      const url = value.asset.url || value.asset._ref;

      return (
        <img
          src={url}
          alt={value.alt || 'Image'}
          className="my-4 rounded-md shadow-md max-w-full"
        />
      );
    },
    code: ({ value }) => (
      <pre className="bg-gray-900 text-white text-sm p-4 rounded overflow-x-auto my-4">
        <code>{value.code}</code>
      </pre>
    ),
  },
};

export default function RichText({ value }: RichTextProps) {
  if (!value) return null;

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <PortableText value={value} components={components} />
    </div>
  );
}
