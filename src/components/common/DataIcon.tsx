import React from 'react';
import {
  Rocket,
  Zap,
  Users,
  TrendingUp,
  BarChart3,
  Cpu,
  Code2,
  RefreshCw,
  Building,
  ShoppingBag,
  Scale,
  Truck,
  Globe,
  Search,
  Lightbulb,
  Settings,
  Calendar,
  Trophy,
  Bot,
  Database,
  Sparkles,
  Eye,
  FileText,
  BookOpen
} from 'lucide-react';

interface DataIconProps {
  name: string;
  className?: string;
}

export const DataIcon: React.FC<DataIconProps> = ({ name, className = "w-5 h-5" }) => {
  switch (name.toLowerCase()) {
    case 'rocket': return <Rocket className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'users': return <Users className={className} />;
    case 'trending-up': return <TrendingUp className={className} />;
    case 'bar-chart':
    case 'barchart': return <BarChart3 className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'code': return <Code2 className={className} />;
    case 'refresh-cw': return <RefreshCw className={className} />;
    case 'building': return <Building className={className} />;
    case 'shopping-bag': return <ShoppingBag className={className} />;
    case 'scale': return <Scale className={className} />;
    case 'truck': return <Truck className={className} />;
    case 'globe': return <Globe className={className} />;
    case 'search': return <Search className={className} />;
    case 'lightbulb': return <Lightbulb className={className} />;
    case 'settings': return <Settings className={className} />;
    case 'calendar': return <Calendar className={className} />;
    case 'trophy': return <Trophy className={className} />;
    case 'brain': return <Cpu className={className} />;
    case 'bot': return <Bot className={className} />;
    case 'database': return <Database className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'eye': return <Eye className={className} />;
    case 'filetext':
    case 'document': return <FileText className={className} />;
    case 'book':
    case 'ebook': return <BookOpen className={className} />;
    default: return <Sparkles className={className} />;
  }
};
