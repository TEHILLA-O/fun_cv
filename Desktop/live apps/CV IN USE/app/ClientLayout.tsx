'use client'

import TargetCursor from '../components/TargetCursor'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TargetCursor targetSelector=".cursor-target" spinDuration={3} />
    </>
  )
}
