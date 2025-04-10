
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

const Children = () => {
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const maxVisiblePages = 10

  useEffect(() => {
    axios
      .get('http://192.168.12.245:8594/api/registrations/Allchildren')
      .then((response) => {
        setChildren(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to load data')
        setLoading(false)
      })
  }, [])

  const totalPages = Math.ceil(children.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = children.slice(indexOfFirstItem, indexOfLastItem)

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
            <h3 style={{ color: "#fff" }}>Registered Children</h3>
            <h5 style={{ color: "#fff" }}>Total Number of Children : {children.length}</h5>
        </CAlert>
        {loading && <CSpinner color="primary" />}
        {error && <CAlert color="danger">{error}</CAlert>}
        {!loading && !error && (
          <>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Year of Birth</CTableHeaderCell>
                  <CTableHeaderCell>Guardian Tel</CTableHeaderCell>
                  <CTableHeaderCell>Guardian ZP</CTableHeaderCell>
                  <CTableHeaderCell>Baptized</CTableHeaderCell>
                  <CTableHeaderCell>Communicant</CTableHeaderCell>
                  <CTableHeaderCell>Disabled</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((child) => (
                  <CTableRow key={child.id}>
                    <CTableDataCell>{child.id}</CTableDataCell>
                    <CTableDataCell>{child.fullName}</CTableDataCell>
                    <CTableDataCell>{child.yearOfBirth}</CTableDataCell>
                    <CTableDataCell>{child.guardianTelephone}</CTableDataCell>
                    <CTableDataCell>{child.guardianZpNumber}</CTableDataCell>
                    <CTableDataCell>{child.baptized}</CTableDataCell>
                    <CTableDataCell>{child.communicant}</CTableDataCell>
                    <CTableDataCell>{child.disabled || 'No'}</CTableDataCell>
                    <CTableDataCell>{child.status === 1 ? 'Active' : 'Inactive'}</CTableDataCell>
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

export default Children
*/

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
} from '@coreui/react'

const Children = () => {
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    fullName: '',
    zp: '',
    mobile: '',
    yob: '',
  })

  const itemsPerPage = 10
  const maxVisiblePages = 10

  useEffect(() => {
    axios
      .get('http://192.168.12.245:8594/api/registrations/Allchildren')
      .then((response) => {
        setChildren(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to load data')
        setLoading(false)
      })
  }, [])

  const filteredChildren = children.filter((child) => {
    const matchesFullName = child.fullName.toLowerCase().includes(filters.fullName.toLowerCase())
    const matchesZp = child.guardianZpNumber.toLowerCase().includes(filters.zp.toLowerCase())
    const matchesMobile = child.guardianTelephone.toLowerCase().includes(filters.mobile.toLowerCase())
    const matchesYob = child.yearOfBirth?.toString().includes(filters.yob)
    return matchesFullName && matchesZp && matchesMobile && matchesYob
  })

  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem)

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

  const handleFilterChange = (e) => {
    setCurrentPage(1)
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  return (
    <CCard>
      <CCardBody>
        <CAlert style={{ backgroundColor: 'rgba(22, 89, 177, 0.925)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: '#fff' }}>Registered Children</h3>
          <h5 style={{ color: '#fff' }}>Total: {filteredChildren.length}</h5>
        </CAlert>

        <CRow className="mb-3">
          <CCol md={3}>
            <CFormInput placeholder="Search Full Name" name="fullName" value={filters.fullName} onChange={handleFilterChange} />
          </CCol>
          <CCol md={3}>
            <CFormInput placeholder="Search Guardian ZP" name="zp" value={filters.zp} onChange={handleFilterChange} />
          </CCol>
          <CCol md={3}>
            <CFormInput placeholder="Search Guardian Telephone" name="mobile" value={filters.mobile} onChange={handleFilterChange} />
          </CCol>
          <CCol md={3}>
            <CFormInput placeholder="Search Year of Birth" name="yob" value={filters.yob} onChange={handleFilterChange} />
          </CCol>
        </CRow>

        {loading && <CSpinner color="primary" />}
        {error && <CAlert color="danger">{error}</CAlert>}
        {!loading && !error && (
          <>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Year of Birth</CTableHeaderCell>
                  <CTableHeaderCell>Guardian Tel</CTableHeaderCell>
                  <CTableHeaderCell>Guardian ZP</CTableHeaderCell>
                  <CTableHeaderCell>Baptized</CTableHeaderCell>
                  <CTableHeaderCell>Communicant</CTableHeaderCell>
                  <CTableHeaderCell>Disabled</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((child) => (
                  <CTableRow key={child.id}>
                    <CTableDataCell>{child.id}</CTableDataCell>
                    <CTableDataCell>{child.fullName}</CTableDataCell>
                    <CTableDataCell>{child.yearOfBirth}</CTableDataCell>
                    <CTableDataCell>{child.guardianTelephone}</CTableDataCell>
                    <CTableDataCell>{child.guardianZpNumber}</CTableDataCell>
                    <CTableDataCell>{child.baptized}</CTableDataCell>
                    <CTableDataCell>{child.communicant}</CTableDataCell>
                    <CTableDataCell>{child.disabled || 'No'}</CTableDataCell>
                    <CTableDataCell>{child.status === 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <div className="d-flex justify-content-center mt-3">
              <CPagination align="center">
                <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                  &laquo;
                </CPaginationItem>

                {getVisiblePages().map((page) => (
                  <CPaginationItem key={page} active={currentPage === page} onClick={() => handlePageChange(page)}>
                    {page}
                  </CPaginationItem>
                ))}

                <CPaginationItem disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
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

export default Children

