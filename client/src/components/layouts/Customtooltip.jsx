import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import PropTypes from "prop-types";

const Customtooltip = ({ trigger, content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Customtooltip;
Customtooltip.propTypes = {
  trigger: PropTypes.object.isRequired,
  content: PropTypes.node.isRequired,
};
