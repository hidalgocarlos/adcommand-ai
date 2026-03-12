"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, ChevronRight, MoreHorizontal } from "lucide-react";

const mockCampaigns = [
  { id: "1", name: "Summer Sale 2026", status: "Active", budget: "$1,500/day", spend: "$8,420", roas: "3.2x", ctr: "1.8%", ai_score: 82 },
  { id: "2", name: "Brand Awareness - US", status: "Active", budget: "$500/day", spend: "$4,200", roas: "1.2x", ctr: "0.8%", ai_score: 45 },
  { id: "3", name: "Retargeting - Cart", status: "Paused", budget: "$200/day", spend: "$12,400", roas: "4.8x", ctr: "3.2%", ai_score: 91 },
  { id: "4", name: "Prospecting - Broad", status: "Active", budget: "$3,000/day", spend: "$45,000", roas: "2.1x", ctr: "1.1%", ai_score: 68 },
];

export function CampaignTable() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-900/60">
          <TableRow className="border-slate-800 hover:bg-transparent">
            <TableHead className="text-slate-400 font-medium">Campaign Name</TableHead>
            <TableHead className="text-slate-400 font-medium">Status</TableHead>
            <TableHead className="text-slate-400 font-medium text-right">Budget</TableHead>
            <TableHead className="text-slate-400 font-medium text-right">Spend</TableHead>
            <TableHead className="text-slate-400 font-medium text-right">ROAS</TableHead>
            <TableHead className="text-slate-400 font-medium text-center">AI Score</TableHead>
            <TableHead className="text-slate-400 font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCampaigns.map((camp) => (
            <TableRow key={camp.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors group">
              <TableCell className="font-semibold text-white">
                <div className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                  {camp.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={camp.status === 'Active' ? 'text-emerald-500 border-emerald-500/20' : 'text-slate-400 border-slate-800'}>
                  {camp.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-slate-300">{camp.budget}</TableCell>
              <TableCell className="text-right text-slate-300 font-mono">{camp.spend}</TableCell>
              <TableCell className="text-right font-bold text-white">{camp.roas}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-16 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${camp.ai_score > 75 ? 'bg-emerald-500' : camp.ai_score > 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                      style={{ width: `${camp.ai_score}%` }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-300">{camp.ai_score}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10">
                    <Brain className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:bg-slate-800">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
