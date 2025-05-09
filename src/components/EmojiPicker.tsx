
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  triggerClassName?: string;
  children: React.ReactNode;
}

// Common emoji categories
const emojis = {
  smileys: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '🥰', '😍', '😘'],
  people: ['👋', '👌', '✌️', '🤟', '👍', '👎', '👏', '🙌', '🤲', '🤝', '🙏', '💪', '🧠', '👀', '👅'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🥅', '🏒', '🏑', '🏏', '⛳'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗'],
};

const EmojiPicker = ({ onEmojiSelect, triggerClassName, children }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger className={triggerClassName}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        className="w-[280px] p-3 bg-zinc-900 border border-zinc-800"
        side="top"
        sideOffset={5}
        align="end"
      >
        <ScrollArea className="h-[250px] pr-3">
          <div className="space-y-3">
            {Object.entries(emojis).map(([category, categoryEmojis]) => (
              <div key={category} className="space-y-1">
                <div className="text-xs text-zinc-400 font-medium capitalize">{category}</div>
                <div className="grid grid-cols-8 gap-1">
                  {categoryEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      className="p-1.5 rounded-md text-lg hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-1 focus:ring-custom-pink"
                      onClick={() => onEmojiSelect(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
