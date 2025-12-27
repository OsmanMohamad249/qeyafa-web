import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Layout from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Contact = lazy(() => import('@/pages/Contact'))
const Apply = lazy(() => import('@/pages/Apply'))
const Assessment = lazy(() => import('@/pages/Assessment'))
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'))
const AgencyPortal = lazy(() => import('@/pages/agency/Portal'))
const Status = lazy(() => import('@/pages/Status'))
const PartnerLanding = lazy(() => import('@/pages/hub/PartnerLanding'))
const SupplierLanding = lazy(() => import('@/pages/hub/SupplierLanding'))
const HubLanding = lazy(() => import('@/pages/hub/HubLanding'))
const PartnerRegister = lazy(() => import('@/pages/hub/PartnerRegister'))
const CorporateLanding = lazy(() => import('@/pages/services/CorporateLanding'))
const Book = lazy(() => import('@/pages/Book'))
const QTMELanding = lazy(() => import('@/pages/QTMELanding'))
const CareersApply = lazy(() => import('@/pages/CareersApply'))
const IndividualTailoring = lazy(() => import('@/pages/services/IndividualTailoring'))

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
          <Route path="/services/individual" element={<IndividualTailoring />} />
          <Route path="/services/b2b" element={<CorporateLanding />} />
          <Route path="/hub" element={<HubLanding />} />
          <Route path="/hub/register" element={<PartnerRegister />} />
          <Route path="/hub/partners" element={<PartnerLanding />} />
          <Route path="/hub/suppliers" element={<SupplierLanding />} />
          <Route path="/book" element={<Book />} />
          <Route path="/qtme" element={<QTMELanding />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<CareersApply />} />
          <Route path="/careers/apply" element={<CareersApply />} />
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
