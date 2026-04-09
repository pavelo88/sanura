# ============================================================
# SCRIPT: Generar imagenes con Together.ai (FLUX)
# INSTRUCCIONES:
#   1. Reemplaza TU_API_KEY_AQUI con tu key de together.ai
#   2. Abre PowerShell como Administrador
#   3. Ejecuta: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#   4. Luego: .\Generar_Imagenes_Together.ps1
# ============================================================

$API_KEY = "key_CZoB8xMs5SbepZtL4Z2Nm"
$OUTPUT_DIR = "C:\Users\$env:USERNAME\Documents\Sanura\public"
$API_URL = "https://api.together.xyz/v1/images/generations"

if (-not (Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR | Out-Null
}

$prompts = @(
    @{ file = "Toxina_Botulica_Antes"; text = "Hyperrealistic clinical portrait photography 8k. Ecuadorian woman 35 years old white mestizo brown eyes. Marked expression lines dynamic wrinkles forehead glabella crow feet hypermobile. Expression acute worry furrowed brow tense muscle tension showing stress fatigue. Very fitted beige cotton blouse. Professional clinic neutral gray background hard frontal light." },
    @{ file = "Toxina_Botulica_Despues"; text = "Hyperrealistic luxury beauty magazine portrait 8k. White mestizo woman 35 years old. Face completely smooth relaxed forehead glabella unwrinkled crow feet eliminated natural result. Expression serene peaceful gaze open eyes bright smile radiating calm confidence rejuvenated. Fitted vibrant coral silk blouse. Elegant studio background warm beauty light." },
    
    @{ file = "Bichectomia_Antes"; text = "Hyperrealistic clinical frontal portrait 8k. Ecuadorian man 28 years old light mestizo. Round full cheeks completely hiding cheekbones prominent buccal fat pads childish babyface. Expression insecure shy gaze avoiding camera self-conscious zero confidence. Basic fitted gray cotton t-shirt. Office neutral background flat frontal clinical lighting." },
    @{ file = "Bichectomia_Despues"; text = "Hyperrealistic premium mens fashion portrait 8k. Light mestizo man 28 years old. Cheekbones sharply defined sculpted lower face markedly contoured highly masculine chiseled handsome. Expression confident dominant penetrating gaze model posture powerful smile athletic presence looks super handsome. Ultra fitted black designer shirt. Dramatic Rembrandt studio lighting facial definition." },
    
    @{ file = "Blefaroplastia_Quirurgica_Antes"; text = "Hyperrealistic clinical ophthalmological portrait 8k close-up eyes. Ecuadorian woman 48 years old Andean indigenous. Severe dermatochalasis prolapsed upper eyelid skin excess covering iris tired drooping hooded eyes. Expression heavy sad exhausted gaze closed eyes feeling old fatigued deeply defeated. Fitted matte navy blue blouse. Flat cold medical clinica examination light." },
    @{ file = "Blefaroplastia_Quirurgica_Despues"; text = "Hyperrealistic editorial beauty portrait 8k. Andean indigenous woman 48 years old 6 weeks post-op. Eyelids perfectly sculpted skin retracted open almond shape new youthful contour. Expression eyes wide open bright alert refreshed gaze direct confident smile looks 10 years younger. Fitted bold jewel tone blouse. Soft elegant beauty lighting." },
    
    @{ file = "Lunares_Dermato_Antes"; text = "Hyperrealistic clinical dermatological portrait 8k macro. Ecuadorian man 33 years old dark mestizo brown skin. Face neck multiple prominent raised moles nevi acrocordones skin tags severe pigmentation affecting aesthetics. Expression self-conscious gaze downward deep shame discomfort hiding skin. Very fitted brown button shirt partially open. Sterile medical background clinical overhead light macro photography." },
    @{ file = "Lunares_Dermato_Despues"; text = "Hyperrealistic lifestyle beauty magazine portrait 8k. Dark mestizo man 33 years old skin clear. Face neck completely clean impeccable skin smooth texture no lesions no moles uniform tone. Expression face raised toward light confident smiled proud gaze relaxed posture looks beautiful healthy. Fitted crisp white dress shirt. Warm natural light outdoors professional photographer." },
    
    @{ file = "Acrocordones_Antes"; text = "Hyperrealistic medical dermatological portrait 8k close-up. Ecuadorian woman 42 years old copper mestizo tan skin. Neck décolletage multiple fibromas skin tags acrocordones protruding flesh colored growths friction areas. Expression worried self-conscious touching neck discomfort sadness aesthetic concern frustration. Fitted high neckline modest blouse dark color. Clinic examination light zoomed macro." },
    @{ file = "Acrocordones_Despues"; text = "Hyperrealistic cosmetics lifestyle campaign portrait 8k. Copper mestizo woman 42 years old. Neck décolletage completely smooth clean clear skin no growths no tags uniform texture. Expression confident radiant smile openly showing neck area proud gaze relaxed happy. Fitted elegant trendy low neckline blouse vibrant color flattering. Studio beauty light boutique setting." },
    
    @{ file = "Estimulacion_Capilar_Antes"; text = "Hyperrealistic medical trichological portrait 8k overhead crown view. Ecuadorian man 36 years old white mestizo. Progressive androgenic alopecia significant hair thinning scalp visible thinning crown miniaturized follicles sparse hair. Expression head down defeated gaze hunched posture deep sadness resignation. Very fitted gray polo shirt. Clinical overhead light emphasizing baldness crown area." },
    @{ file = "Estimulacion_Capilar_Despues"; text = "Hyperrealistic premium male lifestyle portrait 8k. White mestizo man 36 years old 4 months result. Hair noticeably thicker denser fuller volume restored strong anchored follicles new growth. Expression confident hands running through thick hair laughing openly radiating joy youth vitality. Same polo shirt navy blue fitted. Modern clean studio natural daylight." }
)

# ============================================================
# FUNCION PARA GENERAR IMAGEN
# ============================================================
function Generate-Image {
    param(
        [string]$FileName,
        [string]$Prompt
    )

    $OutputPath = Join-Path $OUTPUT_DIR "$FileName.png"

    if (Test-Path $OutputPath) {
        $FileSize = (Get-Item $OutputPath).Length
        if ($FileSize -gt 5000) {
            Write-Host "  [EXISTE] $FileName.png - saltando..." -ForegroundColor Yellow
            return
        } else {
            Remove-Item $OutputPath -Force
        }
    }

    $Headers = @{
        "Authorization" = "Bearer $API_KEY"
        "Content-Type"  = "application/json"
    }

    $Body = @{
        model           = "black-forest-labs/FLUX.1-schnell-Free"
        prompt          = $Prompt
        width           = 1024
        height          = 1024
        steps           = 4
        n               = 1
        response_format = "b64_json"
    } | ConvertTo-Json -Depth 5

    try {
        $Response = Invoke-RestMethod -Uri $API_URL -Method POST -Headers $Headers -Body $Body -ErrorAction Stop
        
        $Base64 = $Response.data[0].b64_json
        $Bytes = [Convert]::FromBase64String($Base64)
        [IO.File]::WriteAllBytes($OutputPath, $Bytes)
        $Size = [math]::Round($Bytes.Length / 1024)
        Write-Host "  [OK] $FileName.png (${Size}KB)" -ForegroundColor Green
    }
    catch {
        Write-Host "  [ERROR] $FileName - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# ============================================================
# EJECUCION PRINCIPAL
# ============================================================
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  GENERADOR SANURA - Together.ai FLUX" -ForegroundColor Cyan
Write-Host "  Total: $($prompts.Count) imagenes" -ForegroundColor Cyan
Write-Host "  Destino: $OUTPUT_DIR" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$i = 1
foreach ($item in $prompts) {
    Write-Host "[$i/$($prompts.Count)] $($item.file)" -ForegroundColor White
    Generate-Image -FileName $item.file -Prompt $item.text
    $i++
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  PROCESO COMPLETADO" -ForegroundColor Green
Write-Host "  Imagenes en: $OUTPUT_DIR" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan