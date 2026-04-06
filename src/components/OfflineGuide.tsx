import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Smartphone, Code2, Zap, X, Copy, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function OfflineGuide({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const steps = [
    {
      id: 'termux',
      icon: <Terminal className="text-cannabis-light" />,
      title: 'Termux (The Engine)',
      desc: 'Run the server on your phone.',
      cmd: 'pkg update && pkg upgrade\npkg install nodejs\ncd /sdcard/Download/ganjaguru-socket\nnpm install\nnpm run dev'
    },
    {
      id: 'acode',
      icon: <Code2 className="text-money-gold" />,
      title: 'Acode (The Editor)',
      desc: 'Edit the code on your phone.',
      cmd: 'Open Acode -> Open Folder -> Select "ganjaguru-socket"'
    },
    {
      id: 'single',
      icon: <Zap className="text-curiosity-purple" />,
      title: 'Single-File Build',
      desc: 'Create one HTML file to tap and view.',
      cmd: 'npm run build:single'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[100] flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl glass-morphism rounded-[40px] border border-white/10 overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-12 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cannabis-light/10 rounded-full border border-cannabis-light/20 text-[10px] font-mono text-cannabis-light uppercase">
              <Smartphone size={12} /> Android Offline Guide
            </div>
            <h2 className="text-4xl font-display font-bold">THE SOCKET <span className="text-money-gold">PORTABLE</span></h2>
            <p className="text-white/40 text-sm">How to run and update this app on your Android without internet.</p>
          </div>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.id} className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold">{step.title}</h4>
                    <p className="text-xs text-white/40">{step.desc}</p>
                  </div>
                </div>
                <div className="relative group">
                  <pre className="p-4 bg-black/40 rounded-xl font-mono text-[10px] text-white/60 overflow-x-auto border border-white/5">
                    {step.cmd}
                  </pre>
                  <button 
                    onClick={() => copyToClipboard(step.cmd, step.id)}
                    className="absolute top-2 right-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copied === step.id ? <CheckCircle2 size={14} className="text-cannabis-light" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-cannabis-light/5 rounded-3xl border border-cannabis-light/10 text-center">
            <p className="text-xs font-mono text-cannabis-light uppercase mb-2">Pro Tip</p>
            <p className="text-sm text-white/60">
              Export to ZIP, extract on your phone, and follow these steps. 
              The <strong>dist/index.html</strong> file is your "One-Tap" view!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
