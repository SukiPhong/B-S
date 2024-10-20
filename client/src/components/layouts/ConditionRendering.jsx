import PropTypes from "prop-types";
const ConditionRendering = ({ show = false, children }) => {
  return show ? children : null;
};

export default ConditionRendering;
ConditionRendering.prototype = {
  show: PropTypes.bool,
  children: PropTypes.node,
};
