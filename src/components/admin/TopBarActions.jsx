import {
  X, Bell,
  ChevronRight,
  Copy,
  CheckCircle2,
  MapPin,
  Plane,
  FileText,
  CreditCard,
  Save,
  Info,
  Download,
  Phone,
  User,
  Ticket,
  Wallet,
  Clock,
} from "lucide-react";

export const TopBarActions = ({ children }) => (
  <div className="flex items-center gap-3">
    {children}
    <button className="text-gray-400 hover:text-gray-600">
      <Bell size={18} />
    </button>
  </div>
);