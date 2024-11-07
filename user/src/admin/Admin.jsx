import { toast, Toaster } from 'sonner'
import { Routes, Route, Navigate } from 'react-router-dom'
import WebLayout from './layouts/WebLayout'
import RegisterStudent from './pages/RegisterStudent'
import StudentCompilents from './pages/StudentCompilents'
import Student from './pages/Student'
import Search from './pages/Search'
import ABlockStudent from './comp/Block/ABlockStudent'
import BBlockStudent from './comp/Block/BBlockStudent'
import CBlockStudent from './comp/Block/CBlockStudent'
import DBlockStudent from './comp/Block/DBlockStudent'
import ABlockAttendance from './comp/attendanceBlock/ABlockAttendance'
import BBlockAttendance from './comp/attendanceBlock/BBlockAttendance'
import CBlockAttendance from './comp/attendanceBlock/CBlockAttendance'
import DBlockAttendance from './comp/attendanceBlock/DBlockAttendance'
import FirstYear from './comp/year/FirstYear'
import SecondYear from './comp/year/SecondYear'
import ThirdYear from './comp/year/ThirdYear'
import FourthYear from './comp/year/FourthYear'
import OpenAttendance from './pages/OpenAttendance'
import Year from './pages/Year'
import Block from './pages/Block'


export const Admin = () => {

  return (
    <>
      <Toaster position='top-right' richColors />
        <Routes>
          <Route element={ <WebLayout /> }>
            <Route path='openattendance' element= { <OpenAttendance />} />
            <Route  path='studentcomplients' element={ <StudentCompilents />} />
            <Route path='registerstudent' element={ <RegisterStudent />} />
            <Route path='student' element= { <Student />} />
            <Route path='year' element= { <Year />} />
            <Route path='block' element= { <Block />} />
            <Route path='search' element= { <Search /> } />
            <Route path='ablockstudent' element= { <ABlockStudent />} />
            <Route path='bblockstudent' element= { <BBlockStudent />} />
            <Route path='cblockstudent' element= { <CBlockStudent />} />
            <Route path='dblockstudent' element= { <DBlockStudent />} />
            <Route path='ablockattendance' element= { <ABlockAttendance />} />
            <Route path='bblockattendance' element= { <BBlockAttendance />} />
            <Route path='cblockattendance' element= { <CBlockAttendance />} />
            <Route path='dblockattendance' element= { <DBlockAttendance />} />
            <Route path='firstyear' element= { <FirstYear />} />
            <Route path='secondyear' element= { <SecondYear />} />
            <Route path='thirdyear' element= { <ThirdYear />} />
            <Route path='fourthyear' element= { <FourthYear />} />
            <Route path="/" element={<Navigate to="openattendance" replace />} />
          </Route>
        </Routes>
    </>
  )
}
export default Admin
