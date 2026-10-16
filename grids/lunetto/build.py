# Arma public/grilla-lunetto-oct/ desde src/: imágenes post{N}_{slide}, reels post{N}_reel.mp4, copys.md y los datos de abajo.
import re, json, glob, os, shutil, subprocess
from PIL import Image

T = "/Users/bapxz/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/d26844f8-24ef-468e-aa8f-b58a4418b423/630955e8-bd19-47ed-9379-26f886cb36ee/skills/bluz-content-grid/assets/index_template.html"
SRC = "grids/lunetto/src/"
OUT = "public/grilla-lunetto-oct/"
SLUG = "lunetto-oct"

fechas = {1: "Vie 16 Oct 2026", 2: "Lun 19 Oct 2026", 3: "Mié 21 Oct 2026", 4: "Jue 22 Oct 2026", 5: "Dom 25 Oct 2026"}
notas = {}

shutil.rmtree(OUT + "assets", ignore_errors=True)
os.makedirs(OUT + "assets")
media = {}
for f in sorted(glob.glob(SRC + "post*")):
    b = os.path.basename(f)
    m = re.match(r"post(\d+)_reel\.mp4$", b)
    if m:
        n = int(m.group(1)); dst = f"{OUT}assets/post{n}_reel.mp4"; poster = f"{OUT}assets/post{n}_reel.jpg"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-vf", "scale='min(1080,iw)':-2",
                        "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", dst], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1", "-i", dst, "-frames:v", "1", "-q:v", "3", poster], check=True)
        media[n] = {"video": True}
        continue
    m = re.match(r"post(\d+)_(\d+)\.(webp|jpg|jpeg|png)$", b)
    if m:
        n, i = int(m.group(1)), int(m.group(2))
        media.setdefault(n, {"slides": []})["slides"].append(i)
        im = Image.open(f).convert("RGB"); im.thumbnail((1080, 1350))
        im.save(f"{OUT}assets/post{n}_{i}.jpg", quality=85, optimize=True, progressive=True)
lg = Image.open("public/logos/miolunetto.png").convert("RGBA")
dark = Image.new("RGBA", lg.size, (11, 66, 41, 255)); dark.putalpha(lg.getchannel("A")); dark.save(OUT + "assets/logo.png")

md = open(SRC + "copys.md").read()
caps = {}
for m in re.finditer(r"^## post(\d+)[^\n]*\n(.*?)(?=^## |\Z)", md, re.S | re.M):
    t = m.group(2).strip()
    caps[int(m.group(1))] = "" if t.startswith("(copy pendiente") else t

posts = []
for n in sorted(media):
    d = media[n]
    if d.get("video"):
        p = {"num": n, "type": "video", "label": "Reel", "thumb": f"assets/post{n}_reel.jpg", "slides": [{"type": "video", "src": f"assets/post{n}_reel.mp4"}]}
    else:
        sl = [{"type": "image", "src": f"assets/post{n}_{i}.jpg"} for i in sorted(d["slides"])]
        p = {"num": n, "type": "carousel" if len(sl) > 1 else "image", "label": f"Carrusel · {len(sl)}" if len(sl) > 1 else "Imagen", "thumb": sl[0]["src"], "slides": sl}
    p["fecha"] = fechas.get(n, ""); p["caption"] = caps.get(n, "")
    if n in notas: p["nota"] = notas[n]
    posts.append(p)

s = open(T).read()
s = re.sub(r"const posts = \[.*?\n\];", lambda m: "const posts = " + json.dumps(posts, ensure_ascii=False, indent=1) + ";", s, flags=re.S)
for a, b in {"{{BRAND_NAME}}": "Lunetto", "{{BRAND_SLUG}}": SLUG, "{{CAMPAIGN_EYEBROW}}": "Octubre 2026", "{{CAMPAIGN_TITLE}}": "Octubre"}.items():
    s = s.replace(a, b)
for a, b in [("--accent: #6B4FA0;", "--accent: #0B4229;"), ("--accent-deep: #4A2E7A;", "--accent-deep: #072B1B;"), ("--accent-2: #3FA35C;", "--accent-2: #3E8E5A;"),
             ("--cream: #FAF7F2;", "--cream: #F9EDCA;"), ("--ink: #2B2440;", "--ink: #0B4229;"), ("--ink-soft: #6B6280;", "--ink-soft: #5E6B5F;"), ("--line: #EAE4F5;", "--line: #E6D9B4;"),
             ("rgba(107,79,160,0.06)", "rgba(11,66,41,0.06)"), ("rgba(63,163,92,0.07)", "rgba(11,66,41,0.05)"), ("background: #EFE8FA;", "background: #0B4229; color: #F9EDCA;"),
             ("rgba(74,46,122,", "rgba(11,66,41,"), ("rgba(107,79,160,0.35)", "rgba(11,66,41,0.35)"), ("rgba(43,36,64,", "rgba(7,43,27,")]:
    s = s.replace(a, b)
s = s.replace("  .lb-caption{\n    margin: 8px 0 0;", "  .lb-caption{\n    white-space: pre-line;\n    margin: 8px 0 0;")
s = s.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="robots" content="noindex, nofollow">')
s = s.replace(" — Grid de revisión</title>", " · Grilla de revisión</title>").replace("Grid de revisión — <b>", "Grilla de revisión · <b>")
s = s.replace("  .review-block{", "  .lb-note{ margin:8px 0 0; padding:8px 10px; border-radius:10px; background:#F3E3B5; color:#0B4229; font-size:12px; font-weight:700; line-height:1.4; }\n  .card .flag{ position:absolute; bottom:10px; left:10px; background:#0B4229; color:#F9EDCA; font-size:10px; font-weight:800; padding:3px 8px; border-radius:100px; }\n  .card video{ width:100%; height:100%; object-fit:cover; display:block; }\n  .review-block{")
s = s.replace('<p class="lb-extra" id="lbExtra" style="display:none;"></p>', '<p class="lb-extra" id="lbExtra" style="display:none;"></p>\n        <p class="lb-note" id="lbNote" style="display:none;"></p>')
s = s.replace("  lbExtra.style.display = metaBits.length ? 'block' : 'none';", "  lbExtra.style.display = metaBits.length ? 'block' : 'none';\n  const lbNote = document.getElementById('lbNote');\n  lbNote.textContent = post.nota ? 'Nota de Bluz: ' + post.nota : '';\n  lbNote.style.display = post.nota ? 'block' : 'none';")
s = s.replace("    ${badge ? `<div class=\"badge\">${badge}</div>` : ''}", "    ${badge ? `<div class=\"badge\">${badge}</div>` : ''}\n    ${post.nota ? `<div class=\"flag\">Pendiente</div>` : ''}")
# Los reels se ven en movimiento en la grilla, sin sonido
s = s.replace("    <img src=\"${post.thumb}\" alt=\"Post ${post.num}\">", "    ${post.type === 'video' ? `<video src=\"${post.slides[0].src}\" poster=\"${post.thumb}\" muted loop playsinline autoplay></video>` : `<img src=\"${post.thumb}\" alt=\"Post ${post.num}\">`}")
s = s.replace("line += ` — \"", "line += `: \"").replace(" — ", " · ")
assert "{{" not in s and "—" not in s
open(OUT + "index.html", "w").write(s)
print([(p["num"], p["label"], p["fecha"]) for p in posts])
