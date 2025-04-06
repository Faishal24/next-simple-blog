import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export default function DropdownAction() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-0"><Ellipsis /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit Article</DropdownMenuItem>
        <DropdownMenuItem>Delete Article</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
