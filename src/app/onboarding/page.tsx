"use client";

import React, { useState } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  LayoutDashboard, 
  Facebook, 
  Key, 
  CheckCircle2, 
  Building2,
  ShieldCheck,
  Zap,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: 1, title: "Workspace", icon: Building2, description: "Create your command center" },
  { id: 2, title: "Meta Ads", icon: Facebook, description: "Connect your ad accounts" },
  { id: 3, title: "AI Config", icon: Key, description: "Fuel with intelligence" },
  { id: 4, title: "Success", icon: CheckCircle2, description: "Ready for takeoff" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      setLoading(false);
    }, 800);
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-purple-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-4xl relative">
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2" />
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center group">
                <div 
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border",
                    isActive 
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                      : "bg-black/40 text-white/30 border-white/5 backdrop-blur-xl"
                  )}
                >
                  <Icon className={cn("w-6 h-6 transition-transform", isCurrent && "scale-110")} />
                </div>
                <div className="absolute top-16 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-bold uppercase tracking-widest">{step.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="bg-white/5 border-white/5 backdrop-blur-2xl overflow-hidden">
              <CardContent className="p-12">
                <div className="max-w-xl mx-auto">
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-2">Phase 01</Badge>
                        <h2 className="text-4xl font-bold tracking-tight">Name your workspace</h2>
                        <p className="text-white/50 text-lg">Every great command center needs a name.</p>
                      </div>
                      <div className="space-y-4">
                        <Input 
                          placeholder="e.g. Acme Marketing" 
                          className="h-14 bg-white/5 border-white/10 text-xl focus:ring-purple-500 focus:border-purple-500 transition-all"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-purple-400" />
                            <span className="text-sm font-medium">SOC2 Compliant</span>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                            <Zap className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-medium">Instant Sync</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-2">Phase 02</Badge>
                        <h2 className="text-4xl font-bold tracking-tight">Connect Meta Ads</h2>
                        <p className="text-white/50 text-lg">Securely integrate your campaign data via Graph API.</p>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center">
                              <Facebook className="fill-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">Login with Facebook</p>
                              <p className="text-xs text-white/40">Authorize AdCommand to access your ad accounts.</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-white/20" />
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#050505] px-4 text-white/30">Or use a system user token</span></div>
                        </div>
                        <Input placeholder="EAAX..." className="font-mono bg-white/5 border-white/10" />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 mb-2">Phase 03</Badge>
                        <h2 className="text-4xl font-bold tracking-tight">AI Engine Setup</h2>
                        <p className="text-white/50 text-lg">Select and configure your preferred AI analysis model.</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {['OpenAI', 'Claude', 'Gemini'].map((ai) => (
                          <div key={ai} className="group p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-4 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Brain className="w-6 h-6" />
                            </div>
                            <span className="font-semibold">{ai}</span>
                          </div>
                        ))}
                      </div>
                      <Input placeholder="sk-..." type="password" className="bg-white/5 border-white/10" />
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="text-center space-y-8 py-12">
                      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 text-green-500 mb-4 animate-bounce">
                        <CheckCircle2 className="h-12 w-12" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-5xl font-bold tracking-tight">You're all set!</h2>
                        <p className="text-white/60 text-xl">Command center initialized. Prepare for intelligent growth.</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-12 flex gap-4">
                    {currentStep > 1 && currentStep < 4 && (
                      <Button 
                        variant="ghost" 
                        onClick={prevStep}
                        className="h-14 px-8 text-white/50 hover:text-white"
                      >
                        Back
                      </Button>
                    )}
                    <Button 
                      onClick={currentStep === 4 ? () => window.location.href = '/dashboard' : nextStep}
                      disabled={loading}
                      className="h-14 flex-1 bg-white text-black hover:bg-white/90 text-lg font-bold shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      {loading ? (
                        <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          {currentStep === 4 ? "Enter Dashboard" : "Continue"}
                          <ChevronRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <div className="mt-12 flex items-center gap-2 opacity-30 select-none">
        <LayoutDashboard className="w-4 h-4" />
        <span className="text-xs font-bold tracking-tighter uppercase">AdCommand AI Engine v1.0</span>
      </div>
    </div>
  );
}
