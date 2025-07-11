'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'

export default function NovoAnimalPage() {
  const router = useRouter()

  return (
    <AppLayout
      breadcrumbItems={[
        { label: "Animais", href: "/animais" },
        { label: "Novo Animal", isActive: true }
      ]}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Novo Animal</h1>
        <p>Página em construção...</p>
      </div>
    </AppLayout>
  )
}
