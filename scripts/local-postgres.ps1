$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$pgBin = 'C:\Program Files\PostgreSQL\18\bin'
if (!(Test-Path "$pgBin\initdb.exe")) { throw 'Установите PostgreSQL 18 или задайте путь pgBin в этом скрипте.' }
$clusterRoot = Join-Path $env:LOCALAPPDATA 'KikoProjectPostgres'
$clusterData = Join-Path $clusterRoot 'data'
$envPath = Join-Path $projectRoot '.env'
New-Item -ItemType Directory -Force $clusterRoot | Out-Null
if (!(Test-Path "$clusterData\PG_VERSION")) {
  if (Test-Path $envPath) { throw '.env уже существует. Используйте свою DATABASE_URL или переместите .env перед созданием отдельной локальной БД.' }
  $password = [guid]::NewGuid().ToString('N')
  $passwordFile = Join-Path $clusterRoot 'initial-password.tmp'
  [IO.File]::WriteAllText($passwordFile, $password)
  try {
    & "$pgBin\initdb.exe" -D $clusterData -U kiko --pwfile=$passwordFile --auth=scram-sha-256 --encoding=UTF8 --locale=C
    if ($LASTEXITCODE -ne 0) { throw 'Не удалось создать локальный кластер.' }
    Add-Content "$clusterData\postgresql.conf" "`nport = 5433`nlisten_addresses = '127.0.0.1'"
    [IO.File]::WriteAllText($envPath,"DATABASE_URL=postgresql://kiko:$password@127.0.0.1:5433/kiko`nPORT=3001`nADMIN_EMAIL=admin1@gmail.com`nADMIN_PASSWORD=KikoDemo2026!`n")
  } finally { if (Test-Path -LiteralPath $passwordFile) { Remove-Item -LiteralPath $passwordFile } }
}
& "$pgBin\pg_ctl.exe" status -D $clusterData *> $null
if ($LASTEXITCODE -ne 0) {
  & "$pgBin\pg_ctl.exe" start -D $clusterData -l "$clusterRoot\postgres.log" -w
  if ($LASTEXITCODE -ne 0) { throw "Не удалось запустить PostgreSQL. См. $clusterRoot\postgres.log" }
}
# Создаём только свою БД, не меняя установленную службу PostgreSQL.
$config = Get-Content $envPath | Where-Object { $_ -match '^DATABASE_URL=' }
$dbUri = [Uri]($config -replace '^DATABASE_URL=','')
$credentials = $dbUri.UserInfo.Split(':',2)
$env:PGPASSWORD = $credentials[1]
try {
  $databaseExists = & "$pgBin\psql.exe" -h 127.0.0.1 -p 5433 -U kiko -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='kiko'"
  if ($LASTEXITCODE -ne 0) { throw 'Не удалось подключиться к локальному кластеру.' }
  if ($databaseExists -ne '1') { & "$pgBin\createdb.exe" -h 127.0.0.1 -p 5433 -U kiko kiko; if ($LASTEXITCODE -ne 0) { throw 'Не удалось создать БД kiko.' } }
} finally { Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue }
Write-Host 'Локальная PostgreSQL запущена на 127.0.0.1:5433. Конфигурация сохранена в .env.'
