"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Sparkles, AlertCircle, TrendingUp, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Recommendation {
  priority: "high" | "medium" | "low";
  title: string;
  explanation: string;
  impact: string;
}

export function AIPanel({ analysis, isStreaming = false }: { analysis?: any, isStreaming?: boolean }) {
  return (
    <div className="flex flex-col h-full bg-slate-900/30 border-l border-slate-800 backdrop-blur-xl">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="text-blue-500 h-5 w-5" />
          <h2 className="text-lg font-bold text-white tracking-tight">AI Analysis Center</h2>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
          PRO Analyst
        </Badge>
      </div>

      <ScrollArea className="flex-1 p-6">
        <AnimatePresence mode="wait">
          {!analysis && !isStreaming ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] text-center"
            >
              <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                <Sparkles className="text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm max-w-[200px]">
                Select a campaign to trigger a deep AI performance audit.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* Executive Summary Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300">Executive Summary</Badge>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {isStreaming ? "AI is analyzing your campaign data..." : "Campaign metrics indicate a strong growth phase with a 15% increase in ROAS. Creative diversity is helping reach new audience pockets efficiently."}
                </p>
              </section>

              {/* Recommendation Cards */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Critical Actions
                </h3>
                
                <RecommendationCard 
                  priority="high"
                  title="Scale Winning Creative Concept #3"
                  explanation="Concept #3 has a 2.1% CTR, significantly higher than the account average of 1.2%."
                  impact="Estimated +20% ROI increase"
                />
                
                <RecommendationCard 
                  priority="medium"
                  title="Optimize Budget for 'Summer Story'"
                  explanation="Current spend is capped by budget limits while maintaining a ROAS of 3.5."
                  impact="Estimated +$500 weekly profit"
                />
              </section>
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>

      <div className="p-6 border-t border-slate-800 bg-slate-900/50">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Sparkles className="mr-2 h-4 w-4" />
          Regenerate Analysis
        </Button>
      </div>
    </div>
  );
}

function RecommendationCard({ priority, title, explanation, impact }: Recommendation) {
  const priorityColors = {
    high: "bg-red-500/10 text-red-500 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <Card className="bg-slate-800/40 border-slate-700/50 overflow-hidden group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge className={priorityColors[priority]}>
            {priority.toUpperCase()}
          </Badge>
        </div>
        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-400 mb-3">{explanation}</p>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
          <TrendingUp className="h-3 w-3" />
          {impact}
        </div>
      </CardContent>
    </Card>
  );
}
