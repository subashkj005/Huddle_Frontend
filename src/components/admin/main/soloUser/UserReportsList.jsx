import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../../axios/axiosInstance';
import { POST_URL } from '../../../../constants/urls';

function UserReportsList() {

const { userId } = useParams();
const [reports, setReports] = useState([])
const [skelton, setSkelton] = useState(false)
const navigate = useNavigate();

useEffect(() => {
    setSkelton(true)
    axiosInstance.get(`${POST_URL}/user_report/${userId}`)
    .then((res)=>{
        setReports(res?.data?.reports)
    })
    .catch((err)=>{
        console.log('Err at getting user reports', err)
    })
    .finally(()=>{
        setSkelton(false)
    })

  return () => {
    setReports([])
  }
}, [userId])

const viewReport = (report_id) => {
    navigate(`/admin/reports/posts/${report_id}`);
  };


  return (
    <>
    <div className="p-10 w-full rounded-lg shadow-2xl mt-4">
            <div class="flex w-full overflow-x-auto">
              <table class="table-hover table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>ReportID</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
          {skelton && (
              <>
                <td class="animate-pulse">
                  <div class="h-8 p-2 bg-gray-200 mt-3 mx-4 mb-6 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-200 mb-6 mx-4 rounded"></div>
                </td>
                <td class="animate-pulse">
                  <div class="h-8 p-2 bg-gray-200 mt-3 mx-4 mb-6 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-200 mb-6 mx-4 rounded"></div>
                </td>
                <td class="animate-pulse">
                  <div class="h-8 p-2 bg-gray-200 mt-3 mx-4 mb-6 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-200 mb-6 mx-4 rounded"></div>
                </td>
                <td class="animate-pulse">
                  <div class="h-8 p-2 bg-gray-200 mt-3 mx-4 mb-6 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-300 mb-6 mx-4 rounded"></div>
                  <div class="h-8 p-2 bg-gray-200 mb-6 mx-4 rounded"></div>
                </td>
              </>
            )}
            {!skelton && reports &&
              reports.map((report, index) => (
                <tr key={report?.id} onClick={()=>viewReport(report?.id)}>
                  <th>{index + 1}</th>
                  <td>{report?.id}</td>
                  <td>{report?.reported_at}</td>
                  <td>{report?.reviewed ? "Review Completed ✅" : "Review Pending ✒"}</td>
                </tr>
              ))}
          </tbody>
              </table>
            </div>
          </div>
    </>
  )
}

export default UserReportsList