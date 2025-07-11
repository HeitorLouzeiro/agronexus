'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  ArrowLeft,
  Edit, 
  Trash2, 
  Scale,
  Calendar,
  MapPin,
  Activity,
  Heart,
  Stethoscope,
  Beef,
  Baby,
  DollarSign,
  FileText,
  Camera,
  TrendingUp
} from 'lucide-react'

interface AnimalDetailsProps {
  animalId: string
}

// Dados simulados do animal
const animalData = {
  id: 'B001',
  identificacao: 'B001',
  nome: 'Touro Elite',
  sexo: 'M',
  categoria: 'Touro',
  raca: 'Nelore',
  dataNascimento: '2020-03-15',
  idade: '4 anos e 10 meses',
  peso: 520,
  lote: 'Lote 01',
  area: 'Piquete Norte',
  status: 'Ativo',
  valorEstimado: 15000,
  observacoes: 'Reprodutor de alto valor genético',
  genealogia: {
    pai: 'Touro Supremo (T001)',
    mae: 'Vaca Estrela (V001)',
    avoPat: 'Touro Rei (T002)',
    avoMat: 'Vaca Luna (V002)'
  },
  pesagens: [
    { data: '2024-01-15', peso: 520, gmd: 0.8 },
    { data: '2023-12-15', peso: 495, gmd: 0.9 },
    { data: '2023-11-15', peso: 468, gmd: 0.7 },
    { data: '2023-10-15', peso: 447, gmd: 0.6 },
    { data: '2023-09-15', peso: 429, gmd: 0.8 },
  ],
  manejos: [
    { data: '2024-01-10', tipo: 'Vacinação', descricao: 'Febre Aftosa', veterinario: 'Dr. João Silva' },
    { data: '2024-01-05', tipo: 'Vermifugação', descricao: 'Ivermectina', veterinario: 'Dr. Maria Santos' },
    { data: '2023-12-20', tipo: 'Exame', descricao: 'Exame andrológico', veterinario: 'Dr. Carlos Lima' },
    { data: '2023-12-15', tipo: 'Pesagem', descricao: 'Pesagem mensal', veterinario: 'João Silva' },
  ],
  saude: {
    ultimaVacina: '2024-01-10',
    proximaVacina: '2024-07-10',
    ultimoVermifugo: '2024-01-05',
    proximoVermifugo: '2024-04-05',
    estadoSaude: 'Saudável',
    alertas: []
  },
  financeiro: {
    valorCompra: 12000,
    dataCompra: '2022-01-15',
    valorAtual: 15000,
    custosManutencao: 2500,
    roi: 25
  }
}

export default function AnimalDetails({ animalId }: AnimalDetailsProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{animalData.nome}</h1>
            <p className="text-muted-foreground">ID: {animalData.identificacao} • {animalData.categoria} • {animalData.raca}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Camera className="h-4 w-4 mr-2" />
            Adicionar Foto
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Remover
          </Button>
        </div>
      </div>

      {/* Cards de Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peso Atual</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{animalData.peso}kg</div>
            <p className="text-xs text-muted-foreground">
              +25kg no último mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idade</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{animalData.idade}</div>
            <p className="text-xs text-muted-foreground">
              Nascido em {animalData.dataNascimento}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Localização</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{animalData.lote}</div>
            <p className="text-xs text-muted-foreground">
              {animalData.area}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Estimado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {animalData.valorEstimado.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ROI: {animalData.financeiro.roi}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas de Saúde */}
      {animalData.saude.alertas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <Activity className="h-5 w-5 mr-2" />
              Alertas de Saúde
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {animalData.saude.alertas.map((alerta, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span>{alerta}</span>
                  <Button variant="outline" size="sm">
                    Resolver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs com Informações Detalhadas */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="overview">Resumo</TabsTrigger>
          <TabsTrigger value="health">Saúde</TabsTrigger>
          <TabsTrigger value="genealogy">Genealogia</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="finance">Financeiro</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Identificação</p>
                    <p className="text-sm text-muted-foreground">{animalData.identificacao}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nome</p>
                    <p className="text-sm text-muted-foreground">{animalData.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sexo</p>
                    <Badge variant={animalData.sexo === 'M' ? 'default' : 'secondary'}>
                      {animalData.sexo === 'M' ? 'Macho' : 'Fêmea'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Categoria</p>
                    <Badge variant="outline">{animalData.categoria}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Raça</p>
                    <p className="text-sm text-muted-foreground">{animalData.raca}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="default">{animalData.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{animalData.observacoes}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Status de Saúde</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estado Geral</span>
                  <Badge variant="default">{animalData.saude.estadoSaude}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Última Vacina</span>
                  <span className="text-sm text-muted-foreground">{animalData.saude.ultimaVacina}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Próxima Vacina</span>
                  <span className="text-sm text-muted-foreground">{animalData.saude.proximaVacina}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Último Vermífugo</span>
                  <span className="text-sm text-muted-foreground">{animalData.saude.ultimoVermifugo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Próximo Vermífugo</span>
                  <span className="text-sm text-muted-foreground">{animalData.saude.proximoVermifugo}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Manejos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Responsável</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {animalData.manejos.slice(0, 5).map((manejo, index) => (
                      <TableRow key={index}>
                        <TableCell>{manejo.data}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{manejo.tipo}</Badge>
                        </TableCell>
                        <TableCell>{manejo.veterinario}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="genealogy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Árvore Genealógica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Pais</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">Pai</span>
                        <span className="text-sm font-medium">{animalData.genealogia.pai}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">Mãe</span>
                        <span className="text-sm font-medium">{animalData.genealogia.mae}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Avós</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">Avô Paterno</span>
                        <span className="text-sm font-medium">{animalData.genealogia.avoPat}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">Avó Materna</span>
                        <span className="text-sm font-medium">{animalData.genealogia.avoMat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Peso</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Peso (kg)</TableHead>
                    <TableHead>GMD (kg/dia)</TableHead>
                    <TableHead>Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {animalData.pesagens.map((pesagem, index) => (
                    <TableRow key={index}>
                      <TableCell>{pesagem.data}</TableCell>
                      <TableCell>{pesagem.peso}</TableCell>
                      <TableCell>{pesagem.gmd}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-sm text-green-600">+{index === 0 ? 25 : Math.floor(Math.random() * 30)}kg</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Financeiras</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Valor de Compra</span>
                  <span className="text-sm text-muted-foreground">R$ {animalData.financeiro.valorCompra.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data da Compra</span>
                  <span className="text-sm text-muted-foreground">{animalData.financeiro.dataCompra}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Valor Atual</span>
                  <span className="text-sm text-green-600">R$ {animalData.financeiro.valorAtual.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Custos de Manutenção</span>
                  <span className="text-sm text-red-600">R$ {animalData.financeiro.custosManutencao.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ROI</span>
                  <Badge variant="default">{animalData.financeiro.roi}%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valorização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Valorização Total</span>
                    <span className="text-sm font-bold text-green-600">
                      R$ {(animalData.financeiro.valorAtual - animalData.financeiro.valorCompra).toLocaleString()}
                    </span>
                  </div>
                  <Progress value={animalData.financeiro.roi} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    O animal valorizou {animalData.financeiro.roi}% desde a compra
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
