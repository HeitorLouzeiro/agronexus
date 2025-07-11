'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Plus, Scale } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Download, 
  TrendingUp, 
  TrendingDown,
  Activity,
  BarChart3,
  LineChart as LineChartIcon
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

// Dados simulados das pesagens
const pesagensData = [
  {
    id: '1',
    animal: 'B001',
    nomeAnimal: 'Touro Elite',
    categoria: 'Touro',
    dataPesagem: '2024-01-15',
    peso: 520,
    pesoAnterior: 495,
    gmd: 0.83,
    responsavel: 'João Silva',
    observacoes: 'Animal em boa condição'
  },
  {
    id: '2',
    animal: 'V034',
    nomeAnimal: 'Vaca Estrela',
    categoria: 'Vaca',
    dataPesagem: '2024-01-14',
    peso: 450,
    pesoAnterior: 435,
    gmd: 0.50,
    responsavel: 'Maria Santos',
    observacoes: 'Prenhe, peso normal'
  },
  {
    id: '3',
    animal: 'N127',
    nomeAnimal: 'Novilho Forte',
    categoria: 'Novilho',
    dataPesagem: '2024-01-13',
    peso: 380,
    pesoAnterior: 365,
    gmd: 0.75,
    responsavel: 'Carlos Lima',
    observacoes: 'Bom ganho de peso'
  },
  {
    id: '4',
    animal: 'B245',
    nomeAnimal: 'Bezerra Luna',
    categoria: 'Bezerra',
    dataPesagem: '2024-01-12',
    peso: 180,
    pesoAnterior: 165,
    gmd: 1.00,
    responsavel: 'Ana Costa',
    observacoes: 'Crescimento acelerado'
  },
  {
    id: '5',
    animal: 'V089',
    nomeAnimal: 'Vaca Serena',
    categoria: 'Vaca',
    dataPesagem: '2024-01-11',
    peso: 420,
    pesoAnterior: 410,
    gmd: 0.33,
    responsavel: 'Pedro Oliveira',
    observacoes: 'Mantendo peso'
  }
]

// Dados para gráfico de evolução de peso
const evolucaoPesoData = [
  { mes: 'Jul', peso: 395 },
  { mes: 'Ago', peso: 408 },
  { mes: 'Set', peso: 422 },
  { mes: 'Out', peso: 438 },
  { mes: 'Nov', peso: 451 },
  { mes: 'Dez', peso: 467 },
  { mes: 'Jan', peso: 485 }
]

// Dados para gráfico de GMD por categoria
const gmdPorCategoriaData = [
  { categoria: 'Bezerros', gmd: 0.95 },
  { categoria: 'Novilhos', gmd: 0.78 },
  { categoria: 'Vacas', gmd: 0.42 },
  { categoria: 'Touros', gmd: 0.65 }
]

export default function PesagensPage() {
  const router = useRouter()
  const [pesagens, setPesagens] = useState(pesagensData)
  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: 'todas',
    dataInicio: '',
    dataFim: ''
  })
  const [dialogAberto, setDialogAberto] = useState(false)
  const [novaPesagem, setNovaPesagem] = useState({
    animal: '',
    peso: '',
    data: new Date().toISOString().split('T')[0],
    observacoes: ''
  })

  // Função para filtrar pesagens
  const pesagensFiltradas = pesagens.filter(pesagem => {
    return (
      (filtros.busca === '' || 
       pesagem.animal.toLowerCase().includes(filtros.busca.toLowerCase()) ||
       pesagem.nomeAnimal.toLowerCase().includes(filtros.busca.toLowerCase())) &&
      (filtros.categoria === 'todas' || filtros.categoria === '' || pesagem.categoria === filtros.categoria) &&
      (filtros.dataInicio === '' || pesagem.dataPesagem >= filtros.dataInicio) &&
      (filtros.dataFim === '' || pesagem.dataPesagem <= filtros.dataFim)
    )
  })

  // Calcular estatísticas
  const estatisticas = {
    totalPesagens: pesagens.length,
    gmdMedio: pesagens.reduce((acc, p) => acc + p.gmd, 0) / pesagens.length,
    pesoMedio: pesagens.reduce((acc, p) => acc + p.peso, 0) / pesagens.length,
    maiorGmd: Math.max(...pesagens.map(p => p.gmd))
  }

  const handleNovaPesagem = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de salvar a nova pesagem
    console.log('Nova pesagem:', novaPesagem)
    setDialogAberto(false)
    setNovaPesagem({ animal: '', peso: '', data: new Date().toISOString().split('T')[0], observacoes: '' })
  }

  return (
    <AppLayout
      breadcrumbItems={[
        { label: "Animais", href: "/animais" },
        { label: "Pesagens", isActive: true }
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pesagens</h1>
            <p className="text-muted-foreground">
              Controle de peso dos animais
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/animais')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Pesagem
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pesagens Hoje</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+12% desde ontem</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peso Médio</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">445kg</div>
              <p className="text-xs text-muted-foreground">+2kg desde última semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GMD Médio</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.89kg</div>
              <p className="text-xs text-muted-foreground">Ganho médio diário</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Animais Pesados</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">Total de registros</p>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo principal */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pesagens</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Funcionalidade em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
