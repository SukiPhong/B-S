import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Section = ({ title, children, className, isBack, onBack }) => {
  return (
    <div
      className={cn(
        "rounded-md bg-white space-y-6 border p-6 border-slate-200",
        className
      )}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isBack: PropTypes.bool,
  onBack: PropTypes.func,
};
