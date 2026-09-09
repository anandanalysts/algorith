import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, Key, AlertCircle, X, CheckCircle2, UserCheck, Sparkles, ArrowRight } from 'lucide-react';
import { AdminUser, verifyAdminCredentials, AUTHORIZED_ACCOUNTS, saveAuthSession } from '../../utils/learningAuth';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: AdminUser) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Please enter your Owner email or Admin security key.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      const verified = verifyAdminCredentials(passcode);
      if (verified) {
        setIsLoading(false);
        onAuthenticated(verified);
        onClose();
      } else {
        setIsLoading(false);
        setErrorMsg('Access Denied: Unrecognized Owner/Admin credentials or security key. Only authorized owners or admins can upload documents.');
      }
    }, 400);
  };

  const handleQuickLogin = (role: 'owner' | 'admin') => {
    setIsLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      const template = role === 'owner' ? AUTHORIZED_ACCOUNTS.owner : AUTHORIZED_ACCOUNTS.admin;
      const verified: AdminUser = {
        ...template,
        authenticatedAt: new Date().toISOString()
      };
      saveAuthSession(verified);
      setIsLoading(false);
      onAuthenticated(verified);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0B1930] border border-[#12D9F5]/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#1557E8]/20 border border-[#12D9F5]/50 flex items-center justify-center text-[#12D9F5] shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#12D9F5]/10 border border-[#12D9F5]/30 text-[#12D9F5] text-[10px] font-mono uppercase font-bold tracking-wider mb-1">
              <ShieldCheck className="w-3 h-3" />
              Restricted Permission
            </div>
            <h3 className="font-neo text-xl font-bold text-white leading-tight">
              Owner or Admin Verification
            </h3>
          </div>
        </div>

        {/* Informational callout */}
        <div className="bg-[#061226] border border-slate-800 rounded-xl p-4 mb-6 space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
          <p className="font-medium text-slate-200">
            <span className="text-[#12D9F5] font-bold font-mono">Upload Policy:</span> Learning resources, whitepapers, datasets, and architecture diagrams can be published by the <strong className="text-white">Owner</strong> or <strong className="text-white">Verified Admins</strong> only.
          </p>
          <p className="text-slate-400 text-[11px]">
            All materials in the vault remain <strong className="text-[#19DDB5]">100% free and downloadable with 1-click</strong> for all users worldwide.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-4 py-3 rounded-xl flex items-start gap-2.5 mb-5 font-sans">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Passcode / Email Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider flex items-center justify-between">
              <span>Owner Email or Admin Key</span>
              <span className="text-[11px] text-[#12D9F5] lowercase font-normal">e.g. anand.analysts@gmail.com</span>
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter security key or authorized email..."
                className="w-full bg-[#061226] border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#12D9F5] transition-colors"
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-shimmer flex items-center justify-center gap-2 bg-[#1557E8] hover:bg-[#168CFF] text-white text-xs font-bold py-3 rounded-xl shadow-lg shadow-blue-700/30 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verifying authorization...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify &amp; Unlock Upload Access</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Authorize Presets for Owner / Admin */}
        <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#12D9F5]" />
            <span>Quick Authorize as Verified Account:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('owner')}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-[#102544] hover:bg-[#153360] border border-slate-700 hover:border-[#12D9F5] text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 font-bold text-xs">
                👑
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white group-hover:text-[#12D9F5] flex items-center gap-1">
                  <span>Owner (Anand)</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">anand.analysts@gmail.com</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-[#102544] hover:bg-[#153360] border border-slate-700 hover:border-[#19DDB5] text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#19DDB5]/20 text-[#19DDB5] border border-[#19DDB5]/30 flex items-center justify-center shrink-0 font-bold text-xs">
                🛡️
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white group-hover:text-[#19DDB5] flex items-center gap-1">
                  <span>Admin Team</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">admin@algorith.in</div>
              </div>
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
