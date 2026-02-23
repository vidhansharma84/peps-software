import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, getInitials } from "@/lib/utils";

interface AvatarGroupProps {
  users: { name: string; avatar?: string }[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
};

export function AvatarGroup({ users, max = 4, size = "md" }: AvatarGroupProps) {
  const visible = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((user, i) => (
        <Tooltip key={i}>
          <TooltipTrigger asChild>
            <Avatar className={cn(sizeClasses[size], "border-2 border-background")}>
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className={cn(sizeClasses[size], "bg-primary/10")}>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{user.name}</TooltipContent>
        </Tooltip>
      ))}
      {remaining > 0 && (
        <Avatar className={cn(sizeClasses[size], "border-2 border-background")}>
          <AvatarFallback className="bg-muted text-muted-foreground">+{remaining}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
