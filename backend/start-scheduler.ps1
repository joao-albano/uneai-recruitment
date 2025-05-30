# Script PowerShell para iniciar UNE AI Scheduler no Windows
# Para executar: .\start-scheduler.ps1

Write-Host "🚀 INICIANDO UNE AI SCHEDULER - WINDOWS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Instale o Node.js primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se package.json existe
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ package.json não encontrado. Execute este script na pasta backend." -ForegroundColor Red
    exit 1
}

# Verificar se .env existe
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  Arquivo .env não encontrado." -ForegroundColor Yellow
    Write-Host "   Certifique-se de que as variáveis de ambiente estão configuradas." -ForegroundColor Yellow
}

Write-Host "🔄 Iniciando UNE AI Scheduler..." -ForegroundColor Cyan
Write-Host "   - Reengajamento automático" -ForegroundColor White
Write-Host "   - Campanhas de marketing" -ForegroundColor White
Write-Host "   - Execução a cada 6 horas" -ForegroundColor White
Write-Host ""

# Executar o scheduler
try {
    # Modo foreground (interativo)
    if ($args[0] -eq "-background" -or $args[0] -eq "-bg") {
        Write-Host "▶️  Executando em segundo plano..." -ForegroundColor Blue
        Start-Process -FilePath "node" -ArgumentList "start-scheduler.js" -WindowStyle Hidden
        Write-Host "✅ Processo iniciado em segundo plano!" -ForegroundColor Green
        Write-Host "   Use 'Get-Process node' para ver processos ativos" -ForegroundColor Gray
        Write-Host "   Use 'Stop-Process -Name node' para parar" -ForegroundColor Gray
    } else {
        Write-Host "▶️  Executando em modo interativo (Ctrl+C para parar)..." -ForegroundColor Blue
        node start-scheduler.js
    }
} catch {
    Write-Host "❌ Erro ao iniciar o scheduler: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "👋 Scheduler finalizado!" -ForegroundColor Green 