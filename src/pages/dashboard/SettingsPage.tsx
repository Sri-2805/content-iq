import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Link2, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-primary" /> Settings
        </h1>
        <p className="text-muted-foreground text-sm">Manage your profile and preferences.</p>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-primary" />
          <h2 className="font-semibold">Profile</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">Full name</Label>
            <Input defaultValue="John Doe" className="mt-1 bg-muted/50 border-border" />
          </div>
          <div>
            <Label className="text-sm">Email</Label>
            <Input defaultValue="john@example.com" type="email" className="mt-1 bg-muted/50 border-border" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">Niche</Label>
            <Select defaultValue="Tech">
              <SelectTrigger className="mt-1 bg-muted/50 border-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Fashion", "Tech", "Food", "Fitness", "Business", "Travel", "Beauty", "Gaming", "Education", "Other"].map((n) => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm">Posting frequency</Label>
            <Select defaultValue="3x per week">
              <SelectTrigger className="mt-1 bg-muted/50 border-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="3x per week">3x per week</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90" onClick={() => toast({ title: "Profile saved!" })}>
          Save Changes
        </Button>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-4 h-4 text-primary" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        {[
          { label: "Email notifications", desc: "Receive weekly content summaries" },
          { label: "Posting reminders", desc: "Get reminded when it's time to post" },
          { label: "New feature updates", desc: "Be the first to know about new features" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
      </motion.div>

      {/* Connected accounts */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Link2 className="w-4 h-4 text-primary" />
          <h2 className="font-semibold">Connected Accounts</h2>
        </div>
        <p className="text-sm text-muted-foreground">Connect your social media accounts for a personalized experience.</p>
        <div className="mt-4 space-y-3">
          {["Instagram", "TikTok", "YouTube", "LinkedIn", "Twitter/X"].map((p) => (
            <div key={p} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <span className="text-sm">{p}</span>
              <Button variant="outline" size="sm" className="border-border text-xs">Connect</Button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger zone */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="border border-destructive/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <h2 className="font-semibold text-destructive">Danger Zone</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back.</p>
        <Button variant="destructive" size="sm">Delete Account</Button>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
