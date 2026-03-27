import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Bookmark, BookmarkCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const useCopyButton = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopiedId(null), 2000);
  }, [toast]);

  const CopyBtn = ({ text, id, size = "sm" }: { text: string; id: string; size?: "sm" | "default" }) => (
    <Button
      size={size}
      variant="outline"
      className="text-xs border-border transition-all duration-200"
      onClick={() => handleCopy(text, id)}
    >
      {copiedId === id ? (
        <><Check className="w-3 h-3 mr-1 text-success" /> Copied!</>
      ) : (
        <><Copy className="w-3 h-3 mr-1" /> Copy</>
      )}
    </Button>
  );

  return { CopyBtn, copiedId, handleCopy };
};

export const useSaveButton = () => {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast({ title: "Removed from saved" });
      } else {
        next.add(id);
        toast({ title: "Saved! ✅" });
      }
      return next;
    });
  }, [toast]);

  const SaveBtn = ({ id, size = "sm" }: { id: string; size?: "sm" | "default" }) => {
    const saved = savedIds.has(id);
    return (
      <Button
        size={size}
        variant="outline"
        className={`text-xs border-border transition-all duration-200 ${saved ? "border-success/30 text-success" : ""}`}
        onClick={() => handleSave(id)}
      >
        {saved ? (
          <><BookmarkCheck className="w-3 h-3 mr-1" /> Saved!</>
        ) : (
          <><Bookmark className="w-3 h-3 mr-1" /> Save</>
        )}
      </Button>
    );
  };

  return { SaveBtn, savedIds, handleSave };
};

export const useLikeButton = () => {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const LikeBtn = ({ id }: { id: string }) => {
    const liked = likedIds.has(id);
    return (
      <button
        onClick={() => toggleLike(id)}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          liked ? "text-accent scale-110" : "text-muted-foreground hover:text-accent"
        }`}
      >
        <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
      </button>
    );
  };

  return { LikeBtn, likedIds, toggleLike };
};
