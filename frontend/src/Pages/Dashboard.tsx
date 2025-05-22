import React from 'react'
import MapBox from '../Components/MapBox'

const Dashboard: React.FC = () => {
  return (
   <>
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button className="border border-[#055992] p-10 rounded-xl text-lg shadow-md hover:bg-[#055992] hover:text-white transition">
          Total cases reported
        </button>
        <button className="border border-[#055992] p-10 rounded-xl text-lg shadow-md hover:bg-[#055992] hover:text-white transition">
          Open cases
        </button>
        <button className="border border-[#055992] p-10 rounded-xl text-lg shadow-md hover:bg-[#055992] hover:text-white transition">
          Closed cases
        </button>
      </div>
      <div className="mt-10">
        <MapBox />
      </div>
    </div>
   </>
  )
}

export default Dashboard