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
    @{ file = "01_Antes_Limpieza_Facial_Profunda"; text = "Hyperrealistic clinical portrait photography 8k. Ecuadorian woman 24 years old copper mestizo skin dark brown hair. Skin with irregular texture dilated pores comedones dull complexion. Expression gaze down self-conscious lips pressed hunched insecure posture. Matte gray cotton fitted blouse. Premium dermatology clinic background. Raw lateral studio lighting showing real skin texture. No beauty retouching." },
    @{ file = "01_Despues_Limpieza_Facial_Profunda"; text = "Hyperrealistic world-class beauty portrait photography 8k. Ecuadorian woman 24 years old copper mestizo skin. Glass skin luminous minimized pores impeccable texture. Expression direct confident gaze bright eyes wide genuine smile extreme happiness. Deep emerald green silk fitted blouse subtle neckline. Warm golden hour butterfly lighting elegant clinic. Real human skin texture." },
    @{ file = "02_Antes_Peeling"; text = "Hyperrealistic clinical documentary portrait 8k. Ecuadorian man 32 years old Andean mestizo straight black hair. Skin dyschromia mild hyperpigmentation rough texture cheeks. Expression serious tired discouraged gaze hunched posture unhappy. Fitted dull coffee button shirt. Sober clinic hard overhead light. Pure photorealism no filters." },
    @{ file = "02_Despues_Peeling"; text = "Hyperrealistic luxury GQ magazine portrait 8k. Ecuadorian Andean mestizo man 32 years old. Skin completely renewed uniform tone smooth fresh. Expression upright posture magnetic half-smile deep confidence success joy looks handsome. Fitted navy blue dress shirt. Quito penthouse bright midday natural light." },
    @{ file = "03_Antes_Rejuvenecimiento_Celular"; text = "Hyperrealistic dermatological clinical portrait 8k. Ecuadorian woman 45 years old white mestizo brown eyes. Skin actinic damage loss elasticity sagging middle third fatigued. Expression worried furrowed brow dull gaze gloom. Fitted dark olive green turtleneck blouse. Neutral gray clinic cold frontal light." },
    @{ file = "03_Despues_Rejuvenecimiento_Celular"; text = "Hyperrealistic anti-aging beauty magazine cover portrait 8k. Ecuadorian white mestizo woman 45 years old. Face recovered cellular tension dermis turgid elastic spot-free natural youth glow. Expression radiant smile relaxed vitality genuine happiness looks spectacularly beautiful renewed. Fitted vibrant terracotta blouse. Elegant blurred background warm Rembrandt lighting." },
    @{ file = "04_Antes_Tratamiento_de_Arrugas"; text = "Hyperrealistic expert clinical portrait 8k. Ecuadorian woman 38 years old Afro-Ecuadorian rich deep black skin. Marked dynamic wrinkles forehead glabella crow feet. Expression acute stress gaze muscle tension chronic exhaustion bitterness. Very fitted beige knit top. Clinical studio hard light deepening wrinkle furrows." },
    @{ file = "04_Despues_Tratamiento_de_Arrugas"; text = "Hyperrealistic Vogue beauty portrait 8k. Afro-Ecuadorian woman 38 years old rich deep black skin. Upper face smooth relaxed luminous natural features. Expression serene magnetic gaze dazzling smile radiating peace pure happiness looks beautiful. Fitted sleeveless vibrant mustard yellow blouse. Fashion studio Clamshell light perfect skin glow." },
    @{ file = "05_Antes_Hilos_Tensores_Faciales"; text = "Hyperrealistic clinical portrait 8k. Ecuadorian man 48 years old light mestizo honey eyes. Evident tissue ptosis cheek drooping loss mandibular contour. Expression somber gaze floor tense jaw resignation to aging. Fitted ash gray cotton polo shirt. Clinic lateral light accentuating tissue drooping." },
    @{ file = "05_Despues_Hilos_Tensores_Faciales"; text = "Hyperrealistic editorial luxury men magazine portrait 8k. Light mestizo man 48 years old. Cheeks jawline elevated taut perfect vectors rejuvenated face. Expression upright chin high wide smile absolute confidence vitality looks super handsome virile. Ultra fitted black polo shirt. Sunset natural light modern terrace." },
    @{ file = "06_Antes_Blefaroplastia_sin_cirugia"; text = "Hyperrealistic clinical ophthalmological portrait 8k close-up. Ecuadorian woman 52 years old Andean indigenous black thick hair. Mild dermatochalasis excess skin upper eyelids hooded eyes. Expression heavy sad gaze drooping eyelids deeply fatigued no smile. Fitted matte navy blue blouse. Flat cold medical light." },
    @{ file = "06_Despues_Blefaroplastia_sin_cirugia"; text = "Hyperrealistic premium portrait photography 8k. Andean indigenous woman 52 years old. Eyelid skin retracted wonderfully open gaze fresh rested. Expression very open bright eyes warm smile full life immense happiness looks beautiful rejuvenated. Fitted crimson red silk blouse. Warm blurred background soft beauty light." },
    @{ file = "07_Antes_Aumento_de_Labios"; text = "Hyperrealistic clinical facial portrait 8k. Ecuadorian woman 26 years old copper mestizo. Very thin asymmetric lips without vermillion eversion. Expression introverted pressing lips hiding them evasive insecure gaze zero happiness. Very fitted boring pearl gray tank top. Neutral gray clinical background hard lighting." },
    @{ file = "07_Despues_Aumento_de_Labios"; text = "Hyperrealistic international cosmetics campaign portrait 8k. Copper mestizo woman 26 years old. Lips perfect volume golden ratio symmetric hydrated super juicy natural. Expression empowered slightly biting lower lip dazzling smile magnetic gaze looks spectacularly beautiful. Fitted heart neckline blouse intense fuchsia. Beauty studio light reflectors halo shine lips." },
    @{ file = "08_Antes_Proyeccion_de_Menton"; text = "Hyperrealistic clinical profile portrait 8k lateral. Ecuadorian man 29 years old Afro-Esmeraldas black skin. Mild micrognathia recessed chin neck jaw undefined. Expression hunched posture looking down lack character deep insecurity. Fitted wrinkled white button shirt. Clinical studio flat background light." },
    @{ file = "08_Despues_Proyeccion_de_Menton"; text = "Hyperrealistic Men's Health fashion profile portrait 8k three-quarter. Afro-Esmeraldas man 29 years old black skin. Strong chin projected forward taut sculpted mandibular line. Expression head high firm posture proud dominant smile brutal confidence joy looks super handsome masculine. Perfectly fitted black dress shirt. Urban background dramatic contour lighting." },
    @{ file = "09_Antes_Relleno_de_Surcos_Nasogenianos"; text = "Hyperrealistic clinical facial portrait 8k. Ecuadorian woman 42 years old light mestizo light brown hair. Deep nasolabial folds marionette appearance. Expression frustrated tired haggard sad face. Very fitted muted lilac long sleeve blouse. Hard ceiling lighting deep shadows in furrows." },
    @{ file = "09_Despues_Relleno_de_Surcos_Nasogenianos"; text = "Hyperrealistic lifestyle magazine portrait 8k. Light mestizo woman 42 years old. Furrows completely softened cheek volume restored face harmony. Expression relaxed radiating freshness wide genuine smile looks super beautiful full energy. Fitted vibrant coral tank top. Outdoor botanical garden diffuse perfect morning light." },
    @{ file = "10_Antes_Rinomodelacion"; text = "Hyperrealistic strict profile clinical portrait 8k. Ecuadorian woman 25 years old dark mestizo curly hair. Notable dorsal nasal hump slightly drooping nasal tip. Expression hiding from camera ashamed gaze closed posture discomfort with profile. Fitted cream turtleneck blouse. Smooth office background lateral light." },
    @{ file = "10_Despues_Rinomodelacion"; text = "Hyperrealistic editorial beauty profile portrait 8k three-quarter. Dark mestizo woman 25 years old. Nasal dorsum perfectly straight tip subtly elevated defined hyaluronic acid. Expression face raised pride radiant smile self-assured gaze looks beautiful empowered. Fitted bright emerald green asymmetric neckline blouse. Elegant background backlight perfect new profile." },
    @{ file = "11_Antes_Armonizacion_Facial"; text = "Hyperrealistic medical documentary portrait 8k. Ecuadorian woman 39 years old modern Andean indigenous. Face asymmetries generalized volume loss static wrinkles blurred contour. Expression severe empty gaze drooping shoulders deep dissatisfaction. Boring brown fitted blouse. Cold fluorescent clinic light." },
    @{ file = "11_Despues_Armonizacion_Facial"; text = "Hyperrealistic celebrity portrait photography 8k. Andean indigenous woman 39 years old. Face perfect proportions restored cheekbones defined jaw taut skin. Expression spectacular smile sparkling eyes absolute joy overflowing magnetism looks super beautiful premium version. Fitted pearl white silk blouse. High-end studio warm enveloping light." },
    @{ file = "12_Antes_Bichetomia"; text = "Hyperrealistic frontal clinical portrait 8k. Ecuadorian man 27 years old white mestizo. Extremely round full cheeks hiding cheekbones childish appearance. Expression shy self-conscious insecurity. Basic fitted gray t-shirt. Neutral office flat frontal lighting." },
    @{ file = "12_Despues_Bichetomia"; text = "Hyperrealistic commercial men fashion portrait 8k. White mestizo man 27 years old. Lower third defined cheekbones markedly defined highly masculine chiseled. Expression model posture penetrating gaze confident triumphant smile looks super handsome athletic. Ultra fitted black dress shirt unbuttoned neck. Dramatic Rembrandt lighting new facial angles." },
    @{ file = "13_Antes_Lipoescultura_y_Liposuccion"; text = "Hyperrealistic medical body portrait 8k. Ecuadorian woman 33 years old copper mestizo. Localized adiposity flanks abdomen lower back losing waist curve. Expression standing rigidly looking body sadness frustration hunched. Very fitted light blue lycra blouse showing rolls. Medical room hard overhead light." },
    @{ file = "13_Despues_Lipoescultura_y_Liposuccion"; text = "Hyperrealistic fitness lifestyle fashion portrait 8k. Copper mestizo woman 33 years old 6 months result. Hourglass silhouette defined muscular contours perfect anatomical lights shadows. Expression hands waist upright laughing freely total pride looks super beautiful sexy. Same light blue lycra blouse now spectacular embracing new curves. Studio large window natural light." },
    @{ file = "14_Antes_Abdominoplastia"; text = "Hyperrealistic clinical documentary portrait 8k medium shot. Ecuadorian man 42 years old dark mestizo. Hanging flaccid skin apron abdominal diastasis massive weight loss. Expression holding stomach hands deep shame defeat absolute sadness. White button shirt tight middle area unflattering. Cold clinic merciless lighting." },
    @{ file = "14_Despues_Abdominoplastia"; text = "Hyperrealistic luxury magazine portrait 8k medium shot. Dark mestizo man 42 years old 1 year result. Abdominal wall flat firm taut restored. Expression winner posture chest puffed buttoning jacket victory smile immense joy looks super handsome masculine. Perfectly fitted white shirt elegant blazer. Bright natural light city balcony." },
    @{ file = "15_Antes_Rinoplastia"; text = "Hyperrealistic clinical facial profile portrait 8k. Ecuadorian woman 28 years old white phenotype green eyes. Large nose very wide asymmetric nasal bone. Expression hiding face with hair evasive discouraged gaze feeling ugly. Very fitted dark gray blouse. Neutral clinical background lateral light." },
    @{ file = "15_Despues_Rinoplastia"; text = "Hyperrealistic editorial beauty three-quarter profile portrait 8k. White woman green eyes 28 years old 12 months result. Nose sculpted precision no scars harmonious dorsum perfect tip. Expression penetrating bright gaze chin high movie star smile pure happiness looks absurdly beautiful. Fitted emerald green blouse matching eyes. Warm romantic lighting." },
    @{ file = "16_Antes_Otoplastia"; text = "Hyperrealistic medical frontal portrait 8k. Ecuadorian woman 22 years old indigenous beautiful features. Protruding ears very prominent separated from skull. Expression desperately covering ears with hair sad gaze shrinking posture. Fitted muted coffee turtleneck blouse. Standardized office flat light." },
    @{ file = "16_Despues_Otoplastia"; text = "Hyperrealistic haute couture fashion portrait 8k. Indigenous woman 22 years old. Ears perfectly repositioned harmoniously close to head natural folds. Expression hair completely pulled back showing ears with pride wide liberating smile overflowing confidence happiness looks super beautiful. Fitted elegant vibrant orange blouse. Fashion studio spotlight facial symmetry." },
    @{ file = "17_Antes_Tratamiento_de_Cicatrices"; text = "Hyperrealistic clinical dermatological portrait 8k macro. Ecuadorian man 30 years old Afro-Ecuadorian black skin. Thick red raised hypertrophic keloid scar neck chest area. Expression hiding scar with chin bitter gaze defensive posture zero happiness. Very fitted boring black button shirt partially open. Hard clinical light highlighting fibrosis." },
    @{ file = "17_Despues_Tratamiento_de_Cicatrices"; text = "Hyperrealistic commercial male skincare portrait 8k. Afro-Ecuadorian man 30 years old black skin. Scar almost completely gone laser treatment skin flat reorganized collagen uniform tone. Expression neck stretched pride relaxed posture wide charismatic smile total relief joy looks super handsome. Ultra fitted white polo highlighting skin tone. Bright clean daylight." },
    @{ file = "18_Antes_Remocion_de_Lunares"; text = "Hyperrealistic expert clinical portrait 8k macro. Ecuadorian woman 35 years old white Ecuadorian. Face neck multiple prominent moles skin tags severely affecting aesthetics. Expression self-conscious gaze floor deep shame discomfort. Very fitted swamp green blouse. Sterile medical background frontal flash light." },
    @{ file = "18_Despues_Remocion_de_Lunares"; text = "Hyperrealistic Cosmopolitan editorial beauty portrait 8k. White Ecuadorian woman 35 years old. Skin face neck impeccably clean smooth no lesions. Expression face raised toward light eyes closed immense peace happiness smile posing like model looks beautiful radiant. Fitted vibrant lavender silk blouse. Very soft enveloping studio lighting." },
    @{ file = "19_Antes_Tratamiento_de_Secuelas_de_Acne"; text = "Hyperrealistic clinical dermatological portrait 8k macro. Ecuadorian man 26 years old Andean mestizo tan skin. Severe atrophic acne scars icepick boxcar post-inflammatory hyperpigmented macules. Expression devastated gaze zero self-esteem hiding from camera deep sadness. Dirty gray fitted shirt. Grazing studio light marking skin craters depth." },
    @{ file = "19_Despues_Tratamiento_de_Secuelas_de_Acne"; text = "Hyperrealistic global male skincare campaign portrait 8k. Andean mestizo man 26 years old. Skin massive collagen remodeling smooth refined texture homogeneous tone. Expression penetrating eye contact dominant posture winning happy smile overflowing confidence looks super handsome attractive. Fitted steel blue dress shirt. Blurred urban background golden sunset light." },
    @{ file = "20_Antes_Pigmentacion_de_Labios"; text = "Hyperrealistic expert clinical portrait 8k close-up lips macro. Ecuadorian woman 31 years old dark mestizo brown skin. Lips severe dyschromia dark edges pale center undefined lifeless. Expression tense lips dull gaze discomfort zero smile. Boring beige cotton fitted blouse. Cold clinical light." },
    @{ file = "20_Despues_Pigmentacion_de_Labios"; text = "Hyperrealistic makeup advertising portrait 8k. Dark mestizo woman 31 years old brown skin. Lips spectacular uniform pink reddish tone perfectly defined Cupid's bow paramedical tattoo effect. Expression dazzling smile mischievously biting lip eyes pure joy flirtiness looks spectacularly beautiful. Super fitted vibrant magenta blouse. Ring light beautiful glow face and lips." },
    @{ file = "21_Antes_Estimulacion_Capilar"; text = "Hyperrealistic medical trichological portrait 8k overhead view. Ecuadorian man 34 years old white mestizo. Drastic hair thinning scalp very visible crown follicular miniaturization. Expression head down total defeat gaze hunched posture. Very fitted ash gray polo shirt. Hard overhead light showing incipient baldness." },
    @{ file = "21_Despues_Estimulacion_Capilar"; text = "Hyperrealistic premium male lifestyle portrait 8k. White mestizo man 34 years old 6 months result. Hair thick dense full volume firmly anchored modern style. Expression running hand through thick hair laughing openly radiating youth masculinity extreme happiness looks super handsome. Same polo shirt intense navy blue fitted. Midday light modern clean street." },
    @{ file = "22_Antes_Implante_Capilar"; text = "Hyperrealistic clinical portrait photography 8k. Ecuadorian man 45 years old dark mestizo. Advanced androgenic alopecia deep receding hairline frank baldness frontal middle zone. Expression severe aged gaze deep resignation loss self-esteem sadness. Fitted matte black dress shirt. Office merciless hard overhead light." },
    @{ file = "22_Despues_Implante_Capilar"; text = "Hyperrealistic Forbes GQ magazine portrait 8k. Dark mestizo man 45 years old 18 months result. Frontal hairline totally restored dense natural hair elegantly combed back. Expression successful CEO posture wide triumphant smile winking overflowing confidence virility pure happiness looks incredibly handsome 15 years younger. Ultra fitted white button shirt. Luxury glass office panoramic Quito sunset view." },
    @{ file = "23_Antes_Hidrolipoclasia"; text = "Hyperrealistic clinical body portrait 8k. Ecuadorian woman 30 years old Afro-Ecuadorian. Evident localized fat abdomen hips deforming silhouette. Expression gaze floor rigid uncomfortable posture pinching roll frustration sadness. Fitted translucent white blouse showing unwanted bulges fitted pants. Flat clinical light." },
    @{ file = "23_Despues_Hidrolipoclasia"; text = "Hyperrealistic summer fashion portrait 8k. Afro-Ecuadorian woman 30 years old after 6 sessions. Abdomen ultra flat sculpted hips wasp waist. Expression posing professional model hands waist laughing immense joy overwhelming confidence looks super beautiful fit. Very fitted vibrant coral crop top showing perfect abdomen. Outdoor sunlit vibrant happy atmosphere." },
    @{ file = "24_Antes_Diseno_de_Sonrisa"; text = "Hyperrealistic clinical dental portrait 8k close-up mouth macro. Ecuadorian woman 27 years old copper mestizo. Fractured yellowish teeth diastemas gaps non-harmonious dimensions. Expression forced awkward smile hiding teeth ashamed self-conscious zero happiness. Fitted muted brown turtleneck blouse. Dental clinic sterile chair light." },
    @{ file = "24_Despues_Diseno_de_Sonrisa"; text = "Hyperrealistic luxury oral hygiene campaign portrait 8k. Copper mestizo woman 27 years old. Perfect lithium disilicate veneers white symmetric proportional dazzling teeth. Expression laughing open-mouthed without inhibition eyes closed genuine happiness extreme confidence looks incredibly beautiful. Super fitted turquoise blue silky blouse. High contrast beauty lighting perfect smile sparkle." }
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