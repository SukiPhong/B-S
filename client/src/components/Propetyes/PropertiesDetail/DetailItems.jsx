import React from "react";
import PropTypes from "prop-types";
const DetailItems = ({ icon, value, label }) => {
  return (
    <div className=" flex  justify-center  items-center border-y-[1px] border-[rgba(242, 242, 242, 1)] grid grid-cols-2  p-1 h-[35px] ">
      <span className="flex gap-4  items-center">
        <span className="font-roboto font-normal  "> {icon} </span>
        <span className="text-sm text-muted-foreground flex-none  ">
          {label}
        </span>
      </span>
      <span className=" mx-auto  text-xs text-primary">{value}</span>
    </div>
  );
};

export default DetailItems;
DetailItems.propTypes = {
  icon: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};
