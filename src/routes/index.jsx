import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Layout from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Contact = lazy(() => import('@/pages/Contact'))
const Careers = lazy(() => import('@/pages/Careers'))
const Apply = lazy(() => import('@/pages/Apply'))
const Assessment = lazy(() => import('@/pages/Assessment'))
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'))
const AgencyPortal = lazy(() => import('@/pages/agency/Portal'))
const Status = lazy(() => import('@/pages/Status'))

function Fallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-qeyafa-black text-white">
      <div className="flex items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-qeyafa-gold" />
        <span>Loading...</span>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/apply/:jobId?" element={<Apply />} />
          <Route path="/status/:token" element={<Status />} />
        </Route>

        <Route path="/assessment/:token?" element={<Assessment />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/agency/*" element={<AgencyPortal />} />
      </Routes>
    </Suspense>
  )
}
