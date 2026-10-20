# Assembles src/ into the single index.html that gets published (no build step needed on the server).
import pathlib
root = pathlib.Path(__file__).parent
tpl = (root / 'src/index.tpl.html').read_text()
css = (root / 'src/app.css').read_text()
js = (root / 'src/core.js').read_text() + '\n' + (root / 'src/ui.js').read_text()
(root / 'index.html').write_text(tpl.replace('/*__CSS__*/', css).replace('/*__JS__*/', js))
print('index.html', len((root / 'index.html').read_text()) // 1024, 'KB')
