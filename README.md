# AgroNexus - Sistema de Gestão Pecuária 🐄

Sistema completo de gestão pecuária desenvolvido com Django e Django REST Framework. O AgroNexus oferece uma solução integrada para gerenciamento de propriedades rurais, rebanhos, sanidade animal, reprodução, controle financeiro e muito mais.

## ✨ Funcionalidades Principais

### 🏠 Gestão de Propriedades
- Cadastro e gerenciamento de propriedades rurais
- Divisão em áreas, piquetes e instalações
- Controle de ocupação e rotação de pastagens
- Coordenadas GPS e mapeamento

### 🐄 Controle do Rebanho
- Identificação individual dos animais
- Genealogia e controle reprodutivo
- Categorização por idade, sexo e finalidade
- Histórico completo de movimentações

### 📊 Manejo e Pesagem
- Registro de pesagens periódicas
- Cálculo automático de GMD (Ganho Médio Diário)
- Controle de Unidades Animais (UA)
- Histórico detalhado de manejos

### 💉 Sanidade Animal
- Calendário sanitário automático
- Controle de vacinas e medicamentos
- Registro de tratamentos veterinários
- Notificações de carências e próximas doses

### 🧬 Reprodução
- Controle de estações de monta
- Protocolos de IATF customizáveis
- Diagnósticos de gestação
- Registro de partos e nascimentos

### 💰 Gestão Financeira
- Contas bancárias e fluxo de caixa
- Categorização de receitas e despesas
- Relatórios financeiros detalhados
- Análise de custos por animal/lote

### 📈 Relatórios e Dashboards
- Relatórios personalizáveis
- Gráficos e indicadores de desempenho
- Exportação em múltiplos formatos
- API completa para integrações

## 🛠️ Tecnologias Utilizadas

- **Backend**: Django 5.2, Django REST Framework
- **Banco de Dados**: PostgreSQL (produção), SQLite (desenvolvimento)
- **Autenticação**: JWT com refresh tokens
- **Documentação**: Swagger/OpenAPI 3.0
- **Processamento Assíncrono**: Celery + Redis
- **Arquivos**: Suporte a AWS S3 e armazenamento local
- **Relatórios**: ReportLab, Matplotlib, Pandas

## 🚀 Instalação e Configuração

### Pré-requisitos
- Python 3.12+
- Redis (para Celery)
- PostgreSQL (produção)

### Instalação Rápida

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/agronexus.git
cd agronexus

# Executar script de configuração
chmod +x setup.sh
./setup.sh
```

### Configuração Manual

1. **Ambiente Virtual**:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

2. **Dependências**:
```bash
pip install -r requirements.txt
```

3. **Variáveis de Ambiente**:
```bash
cp .env.example .env
# Editar o arquivo .env com suas configurações
```

4. **Banco de Dados**:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

5. **Dados de Teste (Opcional)**:
```bash
# Criar dados fictícios para teste
python manage.py criar_dados_teste --usuarios 2

# Ou forçar criação mesmo se já existirem dados
python manage.py criar_dados_teste --force --usuarios 3 --animais 50
```

6. **Execução**:
```bash
python manage.py runserver
```

## 🛠️ Comandos Úteis

### Criar Dados de Teste

O AgroNexus inclui um comando para criar dados fictícios que facilitam o desenvolvimento e teste:

```bash
# Criar dados básicos (3 proprietários, 80-200 animais por propriedade)
python manage.py criar_dados_teste

# Personalizar quantidade de usuários proprietários
python manage.py criar_dados_teste --usuarios 2

# Limitar quantidade de animais por propriedade
python manage.py criar_dados_teste --animais 50

# Forçar criação mesmo se já existirem dados
python manage.py criar_dados_teste --force

# Exemplo completo com todas as opções
python manage.py criar_dados_teste --force --usuarios 3 --animais 100
```

**Dados criados pelo comando:**
- Super usuário admin (admin / admin123)
- Usuários por perfil: Proprietários, Gerentes, Funcionários, Veterinários
- Propriedades rurais com áreas e piquetes
- Rebanho com animais de diferentes categorias
- Lotes organizados por critérios
- Histórico de pesagens e manejos
- Vacinações e controle sanitário
- Lançamentos financeiros básicos

**Credenciais de teste:**
- Admin: `admin / admin123`
- Proprietários: `proprietario1, proprietario2, proprietario3 / 123456`
- Gerentes: `gerente1, gerente2 / 123456`
- Funcionários: `funcionario1 a funcionario5 / 123456`
- Veterinários: `veterinario1, veterinario2 / 123456`

### Outros Comandos

```bash
# Configurar grupos de usuários
python manage.py setup_groups

# Limpar cache
python manage.py clear_cache

# Executar tarefas pendentes
python manage.py process_tasks
```

## 🔧 Configuração Avançada

### Banco de Dados PostgreSQL

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'agronexus_db',
        'USER': 'seu_usuario',
        'PASSWORD': 'sua_senha',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Celery para Tarefas Assíncronas

```bash
# Terminal 1: Worker
celery -A core worker --loglevel=info

# Terminal 2: Beat (tarefas periódicas)
celery -A core beat --loglevel=info
```

### AWS S3 para Armazenamento

```python
# settings.py
AWS_ACCESS_KEY_ID = 'sua_chave'
AWS_SECRET_ACCESS_KEY = 'sua_chave_secreta'
AWS_STORAGE_BUCKET_NAME = 'seu_bucket'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```

## 📊 API REST

### Endpoints Principais

#### Autenticação
- `POST /api/auth/login/` - Login
- `POST /api/auth/refresh/` - Refresh token
- `POST /api/auth/logout/` - Logout

#### Propriedades
- `GET /api/v1/propriedades/` - Listar propriedades
- `POST /api/v1/propriedades/` - Criar propriedade
- `GET /api/v1/propriedades/{id}/` - Detalhes da propriedade
- `PUT /api/v1/propriedades/{id}/` - Atualizar propriedade

#### Animais
- `GET /api/v1/animais/` - Listar animais
- `POST /api/v1/animais/` - Cadastrar animal
- `GET /api/v1/animais/{id}/` - Detalhes do animal
- `GET /api/v1/animais/{id}/historico/` - Histórico completo

#### Manejos
- `GET /api/v1/manejos/` - Listar manejos
- `POST /api/v1/manejos/` - Registrar manejo
- `GET /api/v1/pesagens/` - Listar pesagens
- `POST /api/v1/pesagens/` - Registrar pesagem

### Filtros e Busca

A API suporta filtros avançados:

```
GET /api/v1/animais/?sexo=F&categoria=vaca&status=ativo
GET /api/v1/pesagens/?data_inicio=2025-01-01&data_fim=2025-12-31
GET /api/v1/manejos/?tipo=vacinacao&search=febre_aftosa
```

### Paginação

```json
{
  "count": 1250,
  "next": "http://localhost:8000/api/v1/animais/?page=2",
  "previous": null,
  "results": [...]
}
```

## 📖 Documentação da API

A documentação interativa está disponível em:

- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **Schema JSON**: http://localhost:8000/api/schema/

## 🧪 Testes

```bash
# Executar todos os testes
python manage.py test

# Testes com coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

## 🔒 Segurança

- Autenticação JWT com refresh tokens
- Permissões baseadas em perfil de usuário
- Validação de dados em todos os endpoints
- Logs de auditoria para ações sensíveis
- Proteção CSRF habilitada
- Headers de segurança configurados

## 👥 Perfis de Usuário

### Proprietário
- Acesso total ao sistema
- Gerenciamento de usuários
- Relatórios financeiros completos

### Gerente
- Gestão operacional
- Cadastro de animais e manejos
- Relatórios de produção

### Funcionário
- Execução de manejos
- Registro de pesagens
- Consulta de informações básicas

### Veterinário
- Foco em sanidade animal
- Calendário sanitário
- Prescrições e tratamentos

## 📊 Principais Modelos

### Animal
- Identificação única
- Genealogia (pai/mãe)
- Dados reprodutivos
- Histórico de saúde
- Controle financeiro

### Propriedade
- Informações cadastrais
- Divisão em áreas
- Coordenadas GPS
- Configurações do sistema

### Manejo
- Tipos: pesagem, vacinação, medicação, etc.
- Controle de custos
- Histórico detalhado
- Animais envolvidos

### Lote
- Agrupamento de animais
- Critérios de formação
- Localização atual
- Métricas de desempenho

## 🔄 Integrações

### Balanças Eletrônicas
- Importação automática de pesagens
- Suporte a múltiplos fabricantes
- Validação de dados

### Sistemas Contábeis
- Exportação de lançamentos
- Integração com ERPs
- Conciliação bancária

### Aplicativos Móveis
- API REST completa
- Sincronização offline
- Notificações push

## 🆘 Solução de Problemas

### Erro de Importação
```bash
# Verificar se o app está instalado
python manage.py check

# Verificar migrações
python manage.py showmigrations
```

### Problemas com Celery
```bash
# Verificar Redis
redis-cli ping

# Reiniciar worker
celery -A core worker --loglevel=info
```

### Banco de Dados
```bash
# Reset completo (cuidado!)
python manage.py flush
python manage.py migrate
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- **Email**: suporte@agronexus.com
- **Documentação**: https://docs.agronexus.com
- **Issues**: https://github.com/seu-usuario/agronexus/issues

## 🎯 Roadmap

- [ ] Aplicativo móvel nativo
- [ ] Integração com drones para monitoramento
- [ ] Análise de imagens via IA
- [ ] Módulo de gestão de funcionários
- [ ] Integração com meteorologia
- [ ] Marketplace de insumos
- [ ] Sistema de rastreabilidade completo

---

**AgroNexus - Sistema ** - Transformando a gestão pecuária através da tecnologia! 🚀
