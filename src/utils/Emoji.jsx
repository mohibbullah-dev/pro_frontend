import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function Emoji({ icon, setIcon }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border w-45 border-gray-700 bg-gray-800 px-3 py-2 text-gray-100"
      >
        <span className="text-xl">{icon || "🙂"}</span>
        <span className="text-sm text-gray-300">Pick emoji</span>
      </button>

      {open && (
        <div className="absolute z-50 right-52  top-0 mt-2  scale-75 origin-top-right">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setIcon(emojiData.emoji); // "🥗"
              setOpen(false);
            }}
            width={280}
            height={350}
            scale-75
            right-0
            origin-top-right
          />
        </div>
      )}
    </div>
  );
}
