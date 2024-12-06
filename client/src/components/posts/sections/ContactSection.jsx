import React from 'react'
import CollapsiblePostSection from '../CollapsiblePostSection'
import { Input } from '@/components/ui/input'
import PropTypes from 'prop-types'
import useMeStore from '@/zustand/useMeStore'

const ContactSection = ({isOpen,onToggle,title}) => {
  const {me} = useMeStore()
  return (
    <CollapsiblePostSection
    title={title}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    <div className="space-y-4">
      <Input
        value={me.fullname}
        readOnly
        className="bg-gray-50"
      />
      <Input
        value={me.email}
        readOnly
        className="bg-gray-50"
      />
      <Input
        value={me.phone}
        readOnly
        className="bg-gray-50"
      />
    </div>
  </CollapsiblePostSection>
  )
}

export default ContactSection
ContactSection.propTypes={
    isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}