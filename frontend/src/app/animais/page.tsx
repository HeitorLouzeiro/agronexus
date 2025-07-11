'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { 
  Beef, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Download, 
  Upload,
  Scale,
  Calendar,
  MapPin,
  Activity,
  Heart,
  Target
} from 'lucide-react'

// Dados simulados dos animais
const animaisData = [
  {
    id: '1',
    identificacao: 'B001',
    nome: 'Touro Elite',
    sexo: 'M',
    categoria: 'Touro',
    raca: 'Nelore',
    dataNascimento: '2020-03-15',
    peso: 520,
    lote: 'Lote 01',
    area: 'Piquete Norte',
    status: 'Ativo',
    valorEstimado: 15000,
    observacoes: 'Reprodutor de alto valor genético'
  },
  {
    id: '2',
    identificacao: 'V034',
    nome: 'Vaca Estrela',
    sexo: 'F',
    categoria: 'Vaca',
    raca: 'Angus',
    dataNascimento: '2019-07-22',
    peso: 450,
    lote: 'Lote 02',
    area: 'Piquete Sul',
    status: 'Prenhe',
    valorEstimado: 8500,
    observacoes: 'Matriz com boa produção leiteira'
  },
  {
    id: '3',
    identificacao: 'N127',
    nome: 'Novilho Forte',
    sexo: 'M',
    categoria: 'Novilho',
    raca: 'Nelore',
    dataNascimento: '2022-01-10',
    peso: 380,
    lote: 'Lote 03',
    area: 'Piquete Central',
    status: 'Ativo',
    valorEstimado: 6200,
    observacoes: 'Bom ganho de peso'
  },
  {
    id: '4',
    identificacao: 'B245',
    nome: 'Bezerra Luna',
    sexo: 'F',
    categoria: 'Bezerra',
    raca: 'Brahman',
    dataNascimento: '2023-05-08',
    peso: 180,
    lote: 'Lote 04',
    area: 'Piquete Oeste',
    status: 'Ativo',
    valorEstimado: 3500,
    observacoes: 'Animal jovem com bom potencial'
  },
  {
    id: '5',
    identificacao: 'V089',
    nome: 'Vaca Serena',
    sexo: 'F',
    categoria: 'Vaca',
    raca: 'Angus',
    dataNascimento: '2018-11-12',
    peso: 420,
    lote: 'Lote 02',
    area: 'Piquete Sul',
    status: 'Ativo',
    valorEstimado: 7800,
    observacoes: 'Excelente produtora'
  }
]

const estatisticasAnimais = {
  totalAnimais: 1247,
  lotesPorSexo: {
    machos: 412,
    femeas: 835
  },
  pesoTotal: 524850,
  pesoMedio: 420.8,
  valorTotal: 10475000,
  gmdMedio: 0.85
}

export default function AnimaisPage() {
  const router = useRouter()
  const [animais, setAnimais] = useState(animaisData)
  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: 'todas',
    sexo: 'todos',
    status: 'todos'
  })

  // Função para calcular idade
  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date()
    const nascimento = new Date(dataNascimento)
    const diffTime = Math.abs(hoje.getTime() - nascimento.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const meses = Math.floor(diffDays / 30)
    return `${meses} meses`
  }

  // Função para filtrar animais
  const animaisFiltrados = animais.filter(animal => {
    return (
      (filtros.busca === '' || 
       animal.identificacao.toLowerCase().includes(filtros.busca.toLowerCase()) ||
       animal.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
       animal.lote.toLowerCase().includes(filtros.busca.toLowerCase())) &&
      (filtros.categoria === 'todas' || filtros.categoria === '' || animal.categoria === filtros.categoria) &&
      (filtros.sexo === 'todos' || filtros.sexo === '' || animal.sexo === filtros.sexo) &&
      (filtros.status === 'todos' || filtros.status === '' || animal.status === filtros.status)
    )
  })

  return (
    <AppLayout
      breadcrumbItems={[
        { label: "Animais", isActive: true }
      ]}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Controle de Animais</h1>
          <p className="text-muted-foreground">Gerencie todo o seu rebanho</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
            <Button onClick={() => router.push('/animais/novo')}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Animal
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Animais</CardTitle>
              <Beef className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticasAnimais.totalAnimais}</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-green-600 mr-1">↑</span>
                12 novos este mês
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lotes com Animais</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <div className="text-xs text-muted-foreground">
                83% de ocupação
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peso Total</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(estatisticasAnimais.pesoTotal / 1000)}t</div>
              <div className="text-xs text-muted-foreground">
                Média: {estatisticasAnimais.pesoMedio.toFixed(1)}kg
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peso Médio</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticasAnimais.pesoMedio.toFixed(0)}kg</div>
              <div className="text-xs text-muted-foreground">
                GMD: {estatisticasAnimais.gmdMedio}kg/dia
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {(estatisticasAnimais.valorTotal / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-muted-foreground">
                Patrimônio atual
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GMD Médio</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticasAnimais.gmdMedio}kg</div>
              <div className="text-xs text-muted-foreground">
                Ganho médio diário
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="busca">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="busca"
                  placeholder="ID, nome, ou lote do animal..."
                  className="pl-10"
                  value={filtros.busca}
                  onChange={(e) => setFiltros({...filtros, busca: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={filtros.categoria} onValueChange={(value) => setFiltros({...filtros, categoria: value === 'todas' ? '' : value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="Touro">Touro</SelectItem>
                  <SelectItem value="Vaca">Vaca</SelectItem>
                  <SelectItem value="Novilho">Novilho</SelectItem>
                  <SelectItem value="Novilha">Novilha</SelectItem>
                  <SelectItem value="Bezerro">Bezerro</SelectItem>
                  <SelectItem value="Bezerra">Bezerra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sexo">Sexo</Label>
              <Select value={filtros.sexo} onValueChange={(value) => setFiltros({...filtros, sexo: value === 'todos' ? '' : value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="M">Macho</SelectItem>
                  <SelectItem value="F">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filtros.status} onValueChange={(value) => setFiltros({...filtros, status: value === 'todos' ? '' : value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Prenhe">Prenhe</SelectItem>
                  <SelectItem value="Vendido">Vendido</SelectItem>
                  <SelectItem value="Morto">Morto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Tabela de Animais */}
        <Card>
          <CardHeader>
            <CardTitle>
              Animais Cadastrados ({animaisFiltrados.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Raça</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {animaisFiltrados.map((animal) => (
                    <TableRow key={animal.id}>
                      <TableCell className="font-medium">{animal.identificacao}</TableCell>
                      <TableCell>{animal.nome}</TableCell>
                      <TableCell>
                        <Badge variant={animal.sexo === 'M' ? 'default' : 'secondary'}>
                          {animal.categoria}
                        </Badge>
                      </TableCell>
                      <TableCell>{animal.raca}</TableCell>
                      <TableCell>{calcularIdade(animal.dataNascimento)}</TableCell>
                      <TableCell>{animal.peso}kg</TableCell>
                      <TableCell>{animal.lote}</TableCell>
                      <TableCell>
                        <Badge variant={
                          animal.status === 'Ativo' ? 'default' :
                          animal.status === 'Prenhe' ? 'secondary' :
                          animal.status === 'Vendido' ? 'outline' : 'destructive'
                        }>
                          {animal.status}
                        </Badge>
                      </TableCell>
                      <TableCell>R$ {animal.valorEstimado.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => router.push(`/animais/${animal.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </AppLayout>
  )
}
