# Arma public/acaure-octubre/ desde src/: imágenes post{N}_{slide}, copys.md y los datos de abajo.
import re, json, glob, os, shutil
from PIL import Image

T = "/Users/bapxz/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/d26844f8-24ef-468e-aa8f-b58a4418b423/630955e8-bd19-47ed-9379-26f886cb36ee/skills/bluz-content-grid/assets/index_template.html"
SRC = "grids/acaure-octubre/src/"
OUT = "public/acaure-octubre/"

fechas = {1: "Lun 5 Oct 2026", 2: "Mié 7 Oct 2026", 3: "Dom 11 Oct 2026", 4: "Mar 13 Oct 2026", 5: "Jue 15 Oct 2026", 6: "Lun 19 Oct 2026"}
notas = {2: "Queda pendiente confirmar si la receta con romero está bien o si prefieren cambiarla."}

# Imágenes
shutil.rmtree(OUT + "assets", ignore_errors=True)
os.makedirs(OUT + "assets")
slides = {}
for f in sorted(glob.glob(SRC + "post*_*.*")):
    m = re.match(r"post(\d+)_(\d+)\.", os.path.basename(f))
    n, i = int(m.group(1)), int(m.group(2))
    slides.setdefault(n, []).append(i)
    im = Image.open(f).convert("RGB"); im.thumbnail((1080, 1350))
    im.save(f"{OUT}assets/post{n}_{i}.jpg", quality=85, optimize=True, progressive=True)
lg = Image.open("public/logos/acaure.png").convert("RGBA")
dark = Image.new("RGBA", lg.size, (29, 43, 74, 255)); dark.putalpha(lg.getchannel("A")); dark.save(OUT + "assets/logo.png")

# Copys
md = open(SRC + "copys.md").read()
caps = {int(m.group(1)): m.group(2).strip() for m in re.finditer(r"^## post(\d+)[^\n]*\n(.*?)(?=^## |\Z)", md, re.S | re.M)}

posts = []
for n in sorted(slides):
    sl = [{"type": "image", "src": f"assets/post{n}_{i}.jpg"} for i in sorted(slides[n])]
    p = {"num": n, "type": "carousel" if len(sl) > 1 else "image", "label": f"Carrusel · {len(sl)}" if len(sl) > 1 else "Imagen",
         "thumb": sl[0]["src"], "slides": sl, "fecha": fechas.get(n, ""), "caption": caps.get(n, "")}
    if n in notas: p["nota"] = notas[n]
    posts.append(p)

s = open(T).read()
s = re.sub(r"const posts = \[.*?\n\];", lambda m: "const posts = " + json.dumps(posts, ensure_ascii=False, indent=1) + ";", s, flags=re.S)
for a, b in {"{{BRAND_NAME}}": "Acaure", "{{BRAND_SLUG}}": "acaure-octubre", "{{CAMPAIGN_EYEBROW}}": "Octubre 2026", "{{CAMPAIGN_TITLE}}": "Octubre"}.items():
    s = s.replace(a, b)
# Colores de Acaure
for a, b in [("--accent: #6B4FA0;", "--accent: #1D2B4A;"), ("--accent-deep: #4A2E7A;", "--accent-deep: #131D33;"), ("--accent-2: #3FA35C;", "--accent-2: #4F7A3A;"),
             ("--cream: #FAF7F2;", "--cream: #F4F1EC;"), ("--ink: #2B2440;", "--ink: #1D2B4A;"), ("--ink-soft: #6B6280;", "--ink-soft: #6B6A66;"), ("--line: #EAE4F5;", "--line: #E4DED5;"),
             ("rgba(107,79,160,0.06)", "rgba(232,96,44,0.06)"), ("rgba(63,163,92,0.07)", "rgba(29,43,74,0.06)"), ("background: #EFE8FA;", "background: #FBE6DC; color: #C9531F;"),
             ("rgba(74,46,122,", "rgba(29,43,74,"), ("rgba(107,79,160,0.35)", "rgba(29,43,74,0.35)"), ("rgba(43,36,64,", "rgba(19,29,51,")]:
    s = s.replace(a, b)
s = s.replace("  .lb-caption{\n    margin: 8px 0 0;", "  .lb-caption{\n    white-space: pre-line;\n    margin: 8px 0 0;")
s = s.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="robots" content="noindex, nofollow">')
s = s.replace(" — Grid de revisión</title>", " · Grilla de revisión</title>").replace("Grid de revisión — <b>", "Grilla de revisión · <b>")
# Notas de Bluz por post (comentarios pendientes)
s = s.replace("  .review-block{", "  .lb-note{ margin:8px 0 0; padding:8px 10px; border-radius:10px; background:#FBE6DC; color:#8A3A14; font-size:12px; font-weight:700; line-height:1.4; }\n  .card .flag{ position:absolute; bottom:10px; left:10px; background:#E8602C; color:#fff; font-size:10px; font-weight:800; padding:3px 8px; border-radius:100px; letter-spacing:.3px; }\n  .review-block{")
s = s.replace('<p class="lb-extra" id="lbExtra" style="display:none;"></p>', '<p class="lb-extra" id="lbExtra" style="display:none;"></p>\n        <p class="lb-note" id="lbNote" style="display:none;"></p>')
s = s.replace("  lbExtra.style.display = metaBits.length ? 'block' : 'none';", "  lbExtra.style.display = metaBits.length ? 'block' : 'none';\n  const lbNote = document.getElementById('lbNote');\n  lbNote.textContent = post.nota ? 'Nota de Bluz: ' + post.nota : '';\n  lbNote.style.display = post.nota ? 'block' : 'none';")
s = s.replace("    ${badge ? `<div class=\"badge\">${badge}</div>` : ''}", "    ${badge ? `<div class=\"badge\">${badge}</div>` : ''}\n    ${post.nota ? `<div class=\"flag\">Pendiente</div>` : ''}")
s = s.replace("line += ` — \"", "line += `: \"").replace(" — ", " · ")
assert "{{" not in s and "—" not in s, "quedan marcadores o rayas"
open(OUT + "index.html", "w").write(s)
print([(p["num"], len(p["slides"]), p["fecha"], bool(p.get("nota"))) for p in posts])
