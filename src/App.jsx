import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import CreateMessage from './components/CreateMessage'
import Login from './components/Login'
import MessageList from './components/MessageList'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateMessage from './components/UpdateMessage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/messages" element={<MessageList />} />
        <Route path="/messages/create" element={<CreateMessage />} />
        <Route path="/messages/:id/update" element={<UpdateMessage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
