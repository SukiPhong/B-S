import { apiGetPricing } from '@/apis/pricing'
import { EditPricingSheet } from '@/components/admin'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import React, { useEffect, useState } from 'react'

const ManagerPricing = () => {
  const [pricingData, setPricingData] = useState([]) // Initializing as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetPricing()
        if (response.data.success && Array.isArray(response.data.response)) {
          setPricingData(response.data.response)
        } else {
          // Handle case where the response is not an array
          console.error('Expected pricing data to be an array, but got:', response.data.response)
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error)
      }
    }
    fetchData()
  }, [])

  const sortedData = [...pricingData].sort((a, b) => a.priority - b.priority);

  return (
    <div className="flex-1 overflow-y-auto">
         <h1 className="text-3xl font-bold mb-4 ">Quản lý Gói</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Level Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Required Score</TableHead>
            <TableHead>Next Level Score</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pricingData.length > 0 ? (
            sortedData.map((pricing, idx) => (
              <TableRow key={pricing.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{pricing.name}</TableCell>
                <TableCell>{pricing.price}</TableCell>
                <TableCell>{pricing.requireScore}</TableCell>
                <TableCell>{pricing.requireScoreNextLevel}</TableCell>
                <TableCell>{pricing.priority}</TableCell>
                <TableCell>
                  <EditPricingSheet pricing={pricing} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">No pricing data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ManagerPricing
