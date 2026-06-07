import {
  BrainCircuit,
  Cable,
  Compass,
  ExternalLink,
  GitBranch,
  Handshake,
  Landmark,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Network,
  Scale,
  ShieldCheck,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

const icons = {
  BrainCircuit,
  Cable,
  Compass,
  ExternalLink,
  GitBranch,
  Handshake,
  Landmark,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Network,
  Scale,
  ShieldCheck,
  Workflow,
  Wrench,
  Zap,
};

export function IconGlyph({ name, className = "h-5 w-5" }: { name?: string; className?: string }) {
  const Icon = icons[(name ?? "Zap") as keyof typeof icons] ?? Zap;
  return <Icon className={className} strokeWidth={1.7} />;
}
