import { Badge } from "@/components/ui/badge";

interface TaskStatusBadgeProps {
  status: string;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "draft":
        return "bg-muted text-gray-700";
      case "in-progress":
        return "bg-muted text-blue-700";
      case "completed":
        return "bg-muted text-green-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
  };

  return (
    <Badge className={`font-normal ${getStatusStyles()}`}>
      {getStatusText()}
    </Badge>
  );
}
