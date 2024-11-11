import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Collapsible, CollapsibleTrigger } from '../ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CollapsibleContent } from '@radix-ui/react-collapsible'
const CollapsiblePostSection = ({
  title,
  children,
  isOpen,
  onToggle,
  summary,
  optional = false,
}) => (
  <Collapsible open={isOpen} onOpenChange={onToggle} className="space-y-2  p-4 border-2 border-slate-600  bg-white rounded-xl">
    <CollapsibleTrigger className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-xs">{title}</h3>
        {optional && <span className="text-sm text-gray-500">(không bắt buộc)</span>}
      </div>
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </CollapsibleTrigger>
    <CollapsibleContent className="space-y-4">
      {children}
    </CollapsibleContent>
    {!isOpen && summary}
  </Collapsible>
)


export default memo(CollapsiblePostSection);
CollapsiblePostSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  summary: PropTypes.node,
  optional: PropTypes.bool
}