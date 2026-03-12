"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  ArrowRight, 
  Loader2, 
  Mail, 
  Lock, 
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Welcome back, Commander.");
        router.push("/onboarding"); // Redirect to onboarding for new users or dashboard for existing
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans text-slate-200">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl shadow-blue-500/30 flex items-center justify-center mb-6 border border-white/10 rotate-3">
            <Cpu className="text-white h-10 w-10" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">ADCONTROL</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">AI-Powered Meta Command Center</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-3xl rounded-[32px] overflow-hidden shadow-2xl border-t-slate-700/50">
          <CardContent className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Access Identity</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600" />
                  <Input 
                    type="email"
                    placeholder="name@agency.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 pl-12 bg-slate-950/50 border-slate-800 rounded-2xl focus:border-blue-500 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secret Key</label>
                  <button type="button" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400">Forgot?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600" />
                  <Input 
                    type="password"
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 bg-slate-950/50 border-slate-800 rounded-2xl focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-16 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black tracking-wide shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    INITIALIZE COMMAND
                    <ArrowRight size={20} />
                  </>
                )}
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-4 text-slate-600 font-bold tracking-widest">or integrate with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-2xl border-slate-800 bg-slate-950/50 font-bold hover:bg-slate-900">
                  Google
                </Button>
                <Button variant="outline" className="h-14 rounded-2xl border-slate-800 bg-slate-950/50 font-bold hover:bg-slate-900">
                  Microsoft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-slate-500 text-xs font-bold tracking-tight">
            NO ACCOUNT? <span className="text-blue-500 cursor-pointer hover:underline uppercase">REQUEST ACCESS INVITE</span>
          </p>
          <div className="flex items-center gap-2 py-2 px-4 bg-slate-900/50 rounded-full border border-slate-800">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-slate-500 tracking-[0.1em] uppercase">Secured by AES-256 + OAuth 2.1</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
