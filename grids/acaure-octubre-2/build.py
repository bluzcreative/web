# Arma public/acaure-octubre/ (segunda tanda de octubre, reemplaza la primera) desde src/:
# posts post{N}_{slide} o post{N}_reel.mp4, historias historia{N}_{pantalla}, copys en copys.md. Sin fechas.
import re, json, glob, os, shutil, subprocess
from PIL import Image

T = "/Users/bapxz/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/d26844f8-24ef-468e-aa8f-b58a4418b423/630955e8-bd19-47ed-9379-26f886cb36ee/skills/bluz-content-grid/assets/index_template.html"
SRC = "grids/acaure-octubre-2/src/"
OUT = "public/acaure-octubre/"
SLUG = "acaure-octubre"

shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(OUT + "assets")
items = {}  # (kind, n) -> {"video": bool, "slides": [...]}
for f in sorted(glob.glob(SRC + "*")):
    b = os.path.basename(f)
    m = re.match(r"(post|historia)(\d+)_reel\.mp4$", b)
    if m:
        k, n = m.group(1), int(m.group(2)); dst = f"{OUT}assets/{k}{n}_reel.mp4"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-vf", "scale='min(1080,iw)':-2",
                        "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", dst], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1", "-i", dst, "-frames:v", "1", "-q:v", "3", f"{OUT}assets/{k}{n}_reel.jpg"], check=True)
        items[(k, n)] = {"video": True}
        continue
    m = re.match(r"(post|historia)(\d+)_(\d+)\.(webp|jpg|jpeg|png)$", b)
    if m:
        k, n, i = m.group(1), int(m.group(2)), int(m.group(3))
        items.setdefault((k, n), {"slides": []})["slides"].append(i)
        im = Image.open(f).convert("RGB"); im.thumbnail((1080, 1920) if k == "historia" else (1080, 1350))
        im.save(f"{OUT}assets/{k}{n}_{i}.jpg", quality=85, optimize=True, progressive=True)
lg = Image.open("public/logos/acaure.png").convert("RGBA")
dark = Image.new("RGBA", lg.size, (29, 43, 74, 255)); dark.putalpha(lg.getchannel("A")); dark.save(OUT + "assets/logo.png")

md = open(SRC + "copys.md").read()
caps = {}
for m in re.finditer(r"^## (post|historia)(\d+)[^\n]*\n(.*?)(?=^## |\Z)", md, re.S | re.M):
    t = m.group(3).strip()
    caps[(m.group(1), int(m.group(2)))] = "" if t.startswith("(") else t

def entry(k, n):
    d = items[(k, n)]; story = k == "historia"
    if d.get("video"):
        p = {"type": "video", "label": "Historia · video" if story else "Reel", "thumb": f"assets/{k}{n}_reel.jpg", "slides": [{"type": "video", "src": f"assets/{k}{n}_reel.mp4"}]}
    else:
        sl = [{"type": "image", "src": f"assets/{k}{n}_{i}.jpg"} for i in sorted(d["slides"])]
        if story: label = f"Historia · {len(sl)} pantallas" if len(sl) > 1 else "Historia"
        else: label = f"Carrusel · {len(sl)}" if len(sl) > 1 else "Imagen"
        p = {"type": "carousel" if len(sl) > 1 else "image", "label": label, "thumb": sl[0]["src"], "slides": sl}
    p.update({"num": n, "story": story, "caption": caps.get((k, n), "")})
    return p

posts = [entry("post", n) for n in sorted(n for k, n in items if k == "post")]
stories = [entry("historia", n) for n in sorted(n for k, n in items if k == "historia")]
for s in stories: s["num"] = 100 + s["num"]  # clave única para el estado de revisión

s = open(T).read()
s = re.sub(r"const posts = \[.*?\n\];", lambda m: "const posts = " + json.dumps(posts, ensure_ascii=False, indent=1) + ";\nconst stories = " + json.dumps(stories, ensure_ascii=False, indent=1) + ";", s, flags=re.S)
for a, b in {"{{BRAND_NAME}}": "Acaure", "{{BRAND_SLUG}}": SLUG, "{{CAMPAIGN_EYEBROW}}": "Octubre 2026", "{{CAMPAIGN_TITLE}}": "Octubre"}.items():
    s = s.replace(a, b)
for a, b in [("--accent: #6B4FA0;", "--accent: #1D2B4A;"), ("--accent-deep: #4A2E7A;", "--accent-deep: #131D33;"), ("--accent-2: #3FA35C;", "--accent-2: #4F7A3A;"),
             ("--cream: #FAF7F2;", "--cream: #F4F1EC;"), ("--ink: #2B2440;", "--ink: #1D2B4A;"), ("--ink-soft: #6B6280;", "--ink-soft: #6B6A66;"), ("--line: #EAE4F5;", "--line: #E4DED5;"),
             ("rgba(107,79,160,0.06)", "rgba(232,96,44,0.06)"), ("rgba(63,163,92,0.07)", "rgba(29,43,74,0.06)"), ("background: #EFE8FA;", "background: #FBE6DC; color: #C9531F;"),
             ("rgba(74,46,122,", "rgba(29,43,74,"), ("rgba(107,79,160,0.35)", "rgba(29,43,74,0.35)"), ("rgba(43,36,64,", "rgba(19,29,51,")]:
    s = s.replace(a, b)
s = s.replace("  .lb-caption{\n    margin: 8px 0 0;", "  .lb-caption{\n    white-space: pre-line;\n    margin: 8px 0 0;")
s = s.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="robots" content="noindex, nofollow">')
s = s.replace(" — Grid de revisión</title>", " · Grilla de revisión</title>").replace("Grid de revisión — <b>", "Grilla de revisión · <b>")
# Sección de historias (9:16) debajo del feed
s = s.replace('<div class="grid" id="grid"></div>', '<div class="grid" id="grid"></div>\n\n<h2 class="section-title" id="storiesTitle">Historias</h2>\n<div class="grid stories" id="storiesGrid"></div>')
s = s.replace("  .card{\n", "  .section-title{ position:relative; z-index:1; max-width:900px; margin: 0 auto 14px; padding: 0 20px; font-family:'Baloo 2', sans-serif; font-size:22px; color: var(--ink); }\n  .grid.stories{ grid-template-columns: repeat(4, 1fr); }\n  @media (max-width: 640px){ .grid.stories{ grid-template-columns: repeat(2, 1fr); } }\n  .stories .card{ aspect-ratio: 9/16; }\n  .card video{ width:100%; height:100%; object-fit:cover; display:block; }\n  .lightbox.is-story{ max-width: 360px; }\n  .lightbox.is-story .lightbox-media{ aspect-ratio: 9/16; max-height: 62vh; }\n  .card{\n", 1)
s = s.replace("[...posts].reverse().forEach(post => {", "function renderCard(post, target){")
s = s.replace("  card.addEventListener('click', () => openLightbox(post));\n  grid.appendChild(card);\n});", "  card.addEventListener('click', () => openLightbox(post));\n  target.appendChild(card);\n}\n[...posts].reverse().forEach(p => renderCard(p, grid));\nconst storiesGrid = document.getElementById('storiesGrid');\nstories.forEach(p => renderCard(p, storiesGrid));\nif (!stories.length) { storiesGrid.remove(); document.getElementById('storiesTitle').remove(); }")
s = s.replace("<div class=\"num\">Post ${post.num}</div>", "<div class=\"num\">${post.story ? 'Historia ' + (post.num - 100) : 'Post ' + post.num}</div>")
s = s.replace("    <img src=\"${post.thumb}\" alt=\"Post ${post.num}\">", "    ${post.type === 'video' ? `<video src=\"${post.slides[0].src}\" poster=\"${post.thumb}\" muted loop playsinline autoplay></video>` : `<img src=\"${post.thumb}\" alt=\"\">`}")
s = s.replace("  lbSub.textContent = `${post.label} · Post ${post.num}`;", "  lbSub.textContent = post.story ? post.label : `${post.label} · Post ${post.num}`;\n  document.querySelector('.lightbox').classList.toggle('is-story', !!post.story);")
s = s.replace("const card = grid.querySelector(`[data-post-num=\"${currentPost.num}\"]`);", "const card = document.querySelector(`[data-post-num=\"${currentPost.num}\"]`);")
s = s.replace("  const lines = posts.map(p => {", "  const lines = [...posts, ...stories].map(p => {")
s = s.replace("let line = `Post ${p.num} (${p.label})", "let line = `${p.story ? 'Historia ' + (p.num - 100) : 'Post ' + p.num} (${p.label})")
s = s.replace("line += ` — \"", "line += `: \"").replace(" — ", " · ")
assert "{{" not in s and "—" not in s
for needle in ["renderCard(p, grid)", "storiesGrid", "is-story", "[...posts, ...stories]", "'Historia ' + (p.num - 100)"]:
    assert needle in s, needle
open(OUT + "index.html", "w").write(s)
print([(p["num"], p["label"]) for p in posts], [(p["num"], p["label"]) for p in stories])
