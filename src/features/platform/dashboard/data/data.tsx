import { CheckCheckIcon, Clock, FileEdit } from "lucide-react";

export const statuses = [
  {
    value: "FINISHED",
    label: "Finished",
    icon: CheckCheckIcon,
  },
  {
    value: "PENDING",
    label: "Pending",
    icon: FileEdit,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: Clock,
  },
];
