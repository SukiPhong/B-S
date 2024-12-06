import React from 'react'
import PropTypes from 'prop-types'
import { ConditionRendering } from '../layouts'
import { Link, useLocation } from 'react-router-dom'

const CPN_Card = ({icon, title, options, link, label}) => {
  const {pathname} = useLocation()
  return (
    <div className="flex flex-col flex-1 bg-slate-200 p-3 rounded-md">
      <span className="flex gap-2 mb-3">
        {icon}
        <h3 className="font-bold">{title}</h3>
      </span>
      <div className='flex flex-auto bg-white'>
        <div className='flex flex-col'>
          <ConditionRendering show={!options?.id}>
            {options?.price}
          </ConditionRendering>
          <ConditionRendering show={!options?.id}>
            {options?.description}
          </ConditionRendering>
        </div>
      </div>
      <div className='flex bg-slate-100 justify-end h-[30px] mt-2'>
        <Link to={`${pathname.slice(0,pathname.lastIndexOf(('/')))}/${link}`}>
          <p className='text-blue-600 hover:underline'>{label}</p>
        </Link>
      </div>
    </div>
  )
}


export default CPN_Card

CPN_Card.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  options: PropTypes.object,
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
