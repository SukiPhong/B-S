import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PropTypes, { number } from 'prop-types'
const InfoCard = ({title,number,cent,icon}) => {
  return (
    <div> <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{number}</div>
      <p className="text-xs text-muted-foreground">{cent}</p>
    </CardContent>
  </Card></div>
  )
}

export default InfoCard
InfoCard.propTypes={
  title:PropTypes.string.isRequired,
  icon:PropTypes.node.isRequired,
  number:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  cent:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
}