
import React from 'react';
import { ExternalLinkItem } from './types';

interface ExternalLinksProps {
  links: ExternalLinkItem[];
  isCollapsed: boolean;
}

const ExternalLinks = ({ links, isCollapsed }: ExternalLinksProps) => {
  if (isCollapsed || links.length === 0) {
    return null;
  }

  return (
    <div className="pt-4 mt-4 border-t border-zinc-800">
      <div className="px-3 mb-2 text-xs font-semibold text-zinc-500">
        External Links
      </div>
      {links.map(link => (
        <a 
          key={link.label} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
        >
          <link.icon size={18} />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default ExternalLinks;
