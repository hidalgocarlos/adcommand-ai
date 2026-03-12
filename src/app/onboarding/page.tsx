"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Facebook, 
  Key, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const steps = [
  { id: 1, title: "Workspace", icon: <Building2 className="h-5 w-5" />, description: "Name your command center" },
  { id: 2, title: "Meta Business", icon: <Facebook className="h-5 w-5" />, description: "Connect Ads Account" },
  { id: 3, title: "AI Intelligence", icon: <Key className="h-5 w-5" />, description: "Configure API Keys" },
  { id: 4, title: "Complete", icon: <CheckCircle2 className="h-5 w-5" />, description: "Ready for takeoff" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [metaToken, setMetaToken] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  
  const createWorkspace = trpc.workspaces.create.useMutation({
    onSuccess: () => {
      setCurrentStep(4);
      toast.success("Workspace created successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create workspace");
      setIsSubmitting(false);
    }
  });

  const handleNext = () => {
    if (currentStep === 1 && !workspaceName) return toast.error("Please enter a workspace name");
    if (currentStep === 2 && !metaToken) return toast.error("Please enter your Meta Access Token");
    if (currentStep === 3 && !openaiKey) return toast.error("AI Key is recommended for immediate analysis");
    
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    // In a real app, we'd call multiple mutations or one big setup mutation
    createWorkspace.mutate({ name: workspaceName });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-4xl z-10">
        {/* Stepper Header */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={cn(
                  "flex flex-col items-center gap-2 transition-all duration-300",
                  currentStep >= step.id ? "opacity-100" : "opacity-30"
                )}
              >
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500",
                  currentStep === step.id ? "bg-blue-600 text-white scale-110 rotate-3 shadow-blue-500/20" : 
                  currentStep > step.id ? "bg-emerald-500 text-white" : "bg-slate-900 text-slate-400"
                )}>
                  {currentStep > step.id ? <CheckCircle2 size={24} /> : step.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white hidden md:block">
                  {step.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={cn(
                  "h-[2px] w-12 md:w-24 mx-2 rounded-full transition-colors duration-500",
                  currentStep > step.id ? "bg-emerald-500" : "bg-slate-900"
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                    {steps[currentStep-1].title}
                  </h1>
                  <p className="text-slate-400 text-lg font-medium">
                    {steps[currentStep-1].description}
                  </p>
                </div>

                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden p-8 shadow-2xl border-t-slate-700/50">
                  <CardContent className="p-0 space-y-6">
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Workspace Brand Name</label>
                        <Input 
                          placeholder="e.g. Acme Marketing" 
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                          className="h-16 bg-slate-950 border-slate-800 text-xl font-bold rounded-2xl focus:border-blue-500 transition-all px-6"
                        />
                        <p className="text-xs text-slate-500 font-medium">This will be the primary name for your ads command center.</p>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-4">
                          <Zap className="text-blue-500 h-5 w-5" />
                          <p className="text-xs text-blue-300 leading-snug font-medium">
                            Paste your Meta Long-Lived User Access Token. This allows us to pull your campaign data securely.
                          </p>
                        </div>
                        <Input 
                          placeholder="EAAK..." 
                          value={metaToken}
                          onChange={(e) => setMetaToken(e.target.value)}
                          className="h-16 bg-slate-950 border-slate-800 text-sm font-mono rounded-2xl focus:border-blue-500 transition-all px-6"
                        />
                        <Button variant="link" className="text-blue-400 p-0 h-auto text-xs font-bold uppercase tracking-wider">How to get this token? →</Button>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">OpenAI API Key (Recommended)</label>
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Optional</Badge>
                        </div>
                        <Input 
                          type="password"
                          placeholder="sk-..." 
                          value={openaiKey}
                          onChange={(e) => setOpenaiKey(e.target.value)}
                          className="h-16 bg-slate-950 border-slate-800 font-mono rounded-2xl focus:border-blue-500 transition-all px-6"
                        />
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                          <ShieldCheck size={14} className="text-emerald-500" />
                          Keys are AES-256 encrypted & never stored in plaintext.
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="text-center py-6 space-y-6">
                        <div className="h-24 w-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                          <CheckCircle2 size={48} className="text-white" />
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-3xl font-black text-white">System Ready</h2>
                          <p className="text-slate-400 font-medium max-w-[280px] mx-auto">
                            Your engine is calibrated. We're ready to start analyzing your Meta Ads performance.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-4">
                      {currentStep > 1 && currentStep < 4 && (
                        <Button 
                          variant="ghost" 
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="h-14 flex-1 rounded-2xl font-bold text-slate-400 hover:text-white"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                      )}
                      {currentStep < 4 ? (
                        <Button 
                          onClick={handleNext}
                          className="h-14 flex-[2] bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          disabled={isSubmitting}
                          onClick={() => router.push('/dashboard')}
                          className="h-14 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold animate-pulse"
                        >
                          {isSubmitting ? <Loader2 className="animate-spin" /> : "Enter Command Center"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Feature Highlight Area */}
          <div className="lg:col-span-2 space-y-8 hidden lg:block">
            <FeatureItem 
              icon={<Brain className="text-purple-500" />}
              title="Expert AI Consensus"
              text="Analyze campaigns using Gemini, GPT-4, and Claude simultaneously."
            />
            <FeatureItem 
              icon={<ShieldCheck className="text-emerald-500" />}
              title="Enterprise Security"
              text="Bank-grade encryption for all your sensitive API keys and tokens."
            />
            <FeatureItem 
              icon={<Sparkles className="text-amber-500" />}
              title="Instant Insights"
              text="Get actionable decisions in seconds, not hours of spreadsheet work."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="flex gap-4 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-colors">
      <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800 shadow-inner">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold mb-1 tracking-tight">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed font-medium">{text}</p>
      </div>
    </div>
  );
}
