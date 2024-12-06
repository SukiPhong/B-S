import  { memo } from 'react'
import PropTypes from 'prop-types'
import { Collapsible, CollapsibleTrigger } from '../ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CollapsibleContent } from '@radix-ui/react-collapsible'
import { ConditionRendering } from '../layouts'
const CollapsiblePostSection = ({
  title,
  children,
  isOpen,
  onToggle,
  form,
  section,
  optional = false,
}) =>{
  const renderSectionSummary = () => {
    if (isOpen) return null;
    const formValues = form?.getValues();
    switch (section) {
      case "address":
        return <p className="text-sm text-gray-600">{formValues?.address}</p>;
      case "mainInfo":
        return (
          <p className="text-sm text-gray-600">
            {formValues?.priceUnits === "Thỏa thuận" 
              ? `${formValues?.properType} • ${formValues?.priceUnits} • ${formValues?.size} m²`
              : `${formValues?.properType} • ${formValues?.price} ${formValues?.priceUnits} • ${formValues?.size} m²`}
          </p>
        );
      default:
        return null;
    }
  };
  return(
    <Collapsible open={isOpen} onOpenChange={onToggle} className="space-y-2  p-4 border-2 border-slate-600  bg-white rounded-xl">
      <CollapsibleTrigger className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <p className="text-lg font-xs">{title} </p>
          {optional && <span className="text-sm text-gray-500">(không bắt buộc)</span>}
        </div>
        <ConditionRendering show={isOpen}><ChevronUp className="h-5 w-5" /></ConditionRendering>
        <ConditionRendering show={!isOpen}><ChevronDown className="h-5 w-5" /></ConditionRendering>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">
        {children}
      </CollapsibleContent>
     <ConditionRendering show={section}>
     {renderSectionSummary()}
     </ConditionRendering>
    </Collapsible>
  )
} 


export default memo(CollapsiblePostSection);
CollapsiblePostSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  summary: PropTypes.node,
  optional: PropTypes.bool,
  section: PropTypes.string,
  form:PropTypes.object
}