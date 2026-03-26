import { useState } from 'react';

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <>
          <a
            href="mailto:xkldcongthuong@gmail.com"
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            xkldcongthuong@gmail.com
          </a>

          <a
            href="https://zalo.me/0359966168"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap"
          >
            <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center font-black text-xs leading-none border border-white/60 rounded-sm">Z</span>
            Nhắn Zalo
          </a>

          <a
            href="tel:0359966168"
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            035.9966.168
          </a>
        </>
      )}

      <button
        onClick={() => setExpanded(p => !p)}
        className={`w-13 h-13 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          expanded
            ? 'bg-gray-700 hover:bg-gray-800 rotate-45'
            : 'bg-orange-500 hover:bg-orange-600 animate-pulse-slow'
        } text-white`}
        aria-label="Liên hệ"
      >
        {expanded ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
