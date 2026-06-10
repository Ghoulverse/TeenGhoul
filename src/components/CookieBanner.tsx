import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ghoulverse_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('ghoulverse_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('ghoulverse_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-md border-t border-white/10 px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#94a3b8] text-center sm:text-left">
          We use cookies to enhance your experience. By continuing, you agree to our{' '}
          <a href="/cookies.html" className="underline hover:text-[#8b5cf6]">Cookie Policy</a>.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs text-[#94a3b8] hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105"
            style={{ background: '#8b5cf6' }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
