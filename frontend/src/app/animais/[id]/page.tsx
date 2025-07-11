'use client'

import { useParams, useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import AnimalDetails from '@/components/animais/animal-details'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit } from 'lucide-react'

export default function AnimalDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const animalId = params.id as string

  return (
    <AppLayout
      breadcrumbItems={[
        { label: "Animais", href: "/animais" },
        { label: `Animal ${animalId}`, isActive: true }
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Detalhes do Animal</h1>
            <p className="text-muted-foreground">
              Informações completas do animal
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/animais')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>

        {/* Componente de detalhes */}
        <AnimalDetails animalId={animalId} />
      </div>
    </AppLayout>
  )
}
