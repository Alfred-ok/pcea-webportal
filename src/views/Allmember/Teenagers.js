/*

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CSpinner,
  CAlert,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const Teenagers = () => {
  const [teenagers, setTeenagers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const maxVisiblePages = 10

  useEffect(() => {
    axios
      .get('http://192.168.12.245:8594/api/registrations/findAllTeenagers')
      .then((response) => {
        setTeenagers(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to load teenagers data.')
        setLoading(false)
      })
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = teenagers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(teenagers.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getVisiblePages = () => {
    const pages = []
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
    let endPage = startPage + maxVisiblePages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <CCard>
      <CCardBody>
        <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <h3 style={{ color: "#fff" }}>Registered Teenagers</h3>
            <h5 style={{ color: "#fff" }}>Total Number of Teenagers : {teenagers.length}</h5>
        </CAlert>
        {loading && <CSpinner color="primary" />}
        {error && <CAlert color="danger">{error}</CAlert>}
        {!loading && !error && (
          <>
            <CTable striped hover responsive>
              <CTableHead color='primary'>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>DOB</CTableHeaderCell>
                  <CTableHeaderCell>District</CTableHeaderCell>
                  <CTableHeaderCell>Mobile</CTableHeaderCell>
                  <CTableHeaderCell>Holy Communion</CTableHeaderCell>
                  {/*<CTableHeaderCell>Marital Status</CTableHeaderCell>*///}
                  /*
                  <CTableHeaderCell>ZP Number</CTableHeaderCell>
                  <CTableHeaderCell>EPC Number</CTableHeaderCell>
                  <CTableHeaderCell>Disabled</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((teen) => (
                  <CTableRow key={teen.id}>
                    <CTableDataCell>{teen.id}</CTableDataCell>
                    <CTableDataCell>{teen.fullName}</CTableDataCell>
                    <CTableDataCell>{teen.gender}</CTableDataCell>
                    <CTableDataCell>{teen.dob}</CTableDataCell>
                    <CTableDataCell>{teen.district}</CTableDataCell>
                    <CTableDataCell>{teen.mobileNumber}</CTableDataCell>
                    <CTableDataCell>{teen.holyCommunionStatus}</CTableDataCell>
                    {/*<CTableDataCell>{teen.maritalStatus}</CTableDataCell>*///}
                    /*<CTableDataCell>{teen.zpnumber}</CTableDataCell>
                    <CTableDataCell>{teen.epcnumber}</CTableDataCell>
                    <CTableDataCell>{teen.disabled || 'No'}</CTableDataCell>
                    <CTableDataCell>{teen.status === 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <div className="d-flex justify-content-center mt-3">
              <CPagination align="center">
                <CPaginationItem
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &laquo;
                </CPaginationItem>

                {getVisiblePages().map((page) => (
                  <CPaginationItem
                    key={page}
                    active={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </CPaginationItem>
                ))}

                <CPaginationItem
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &raquo;
                </CPaginationItem>
              </CPagination>
            </div>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default Teenagers*/


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CSpinner,
  CAlert,
  CPagination,
  CPaginationItem,
  CFormInput,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import Districtdata from "../Registration/Registration Form/Districtdata";

const Teenagers = () => {
  const [teenagers, setTeenagers] = useState([])
  const [filteredTeenagers, setFilteredTeenagers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const [filters, setFilters] = useState({
    fullName: '',
    zpnumber: '',
    mobileNumber: '',
    district: '',
  })

  const itemsPerPage = 10
  const maxVisiblePages = 10

  useEffect(() => {
    axios
      .get('http://192.168.12.245:8594/api/registrations/findAllTeenagers')
      .then((response) => {
        setTeenagers(response.data)
        setFilteredTeenagers(response.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load teenagers data.')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const filtered = teenagers.filter((teen) => {
      return (
        teen.fullName.toLowerCase().includes(filters.fullName.toLowerCase()) &&
        teen.zpnumber?.toLowerCase().includes(filters.zpnumber.toLowerCase()) &&
        teen.mobileNumber?.toLowerCase().includes(filters.mobileNumber.toLowerCase()) &&
        teen.district?.toLowerCase().includes(filters.district.toLowerCase())
      )
    })
    setFilteredTeenagers(filtered)
    setCurrentPage(1) // reset to first page on filter change
  }, [filters, teenagers])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTeenagers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTeenagers.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getVisiblePages = () => {
    const pages = []
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
    let endPage = startPage + maxVisiblePages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <CCard>
      <CCardBody>
        <CAlert style={{ backgroundColor: 'rgba(22, 89, 177, 0.925)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: '#fff' }}>Registered Teenagers</h3>
          <h5 style={{ color: '#fff' }}>Total Number: {filteredTeenagers.length}</h5>
        </CAlert>

        <CRow className="mb-3">
          <CCol md={3}>
            <CFormInput
              placeholder="Search Full Name"
              value={filters.fullName}
              onChange={(e) => setFilters({ ...filters, fullName: e.target.value })}
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              placeholder="Search ZP Number"
              value={filters.zpnumber}
              onChange={(e) => setFilters({ ...filters, zpnumber: e.target.value })}
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              placeholder="Search Mobile Number"
              value={filters.mobileNumber}
              onChange={(e) => setFilters({ ...filters, mobileNumber: e.target.value })}
            />
          </CCol>
          <CCol md={3}>
            <CFormSelect value={filters.district} onChange={(e) =>  setFilters({ ...filters, district: e.target.value })}>
            <option value="All">All Districts</option>
            {Districtdata.map((data, index) => <option key={index} value={data.district}>{data.district}</option>)}
          </CFormSelect>
          </CCol>
        </CRow>

        {loading && <CSpinner color="primary" />}
        {error && <CAlert color="danger">{error}</CAlert>}
        {!loading && !error && (
          <>
            <CTable striped hover responsive>
              <CTableHead color="primary">
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>DOB</CTableHeaderCell>
                  <CTableHeaderCell>District</CTableHeaderCell>
                  <CTableHeaderCell>Mobile</CTableHeaderCell>
                  <CTableHeaderCell>Holy Communion</CTableHeaderCell>
                  <CTableHeaderCell>ZP Number</CTableHeaderCell>
                  <CTableHeaderCell>EPC Number</CTableHeaderCell>
                  <CTableHeaderCell>Disabled</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((teen) => (
                  <CTableRow key={teen.id}>
                    <CTableDataCell>{teen.id}</CTableDataCell>
                    <CTableDataCell>{teen.fullName}</CTableDataCell>
                    <CTableDataCell>{teen.gender}</CTableDataCell>
                    <CTableDataCell>{teen.dob}</CTableDataCell>
                    <CTableDataCell>{teen.district}</CTableDataCell>
                    <CTableDataCell>{teen.mobileNumber}</CTableDataCell>
                    <CTableDataCell>{teen.holyCommunionStatus}</CTableDataCell>
                    <CTableDataCell>{teen.zpnumber}</CTableDataCell>
                    <CTableDataCell>{teen.epcnumber}</CTableDataCell>
                    <CTableDataCell>{teen.disabled || 'No'}</CTableDataCell>
                    <CTableDataCell>{teen.status === 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <div className="d-flex justify-content-center mt-3">
              <CPagination align="center">
                <CPaginationItem
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &laquo;
                </CPaginationItem>

                {getVisiblePages().map((page) => (
                  <CPaginationItem
                    key={page}
                    active={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </CPaginationItem>
                ))}

                <CPaginationItem
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &raquo;
                </CPaginationItem>
              </CPagination>
            </div>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default Teenagers

