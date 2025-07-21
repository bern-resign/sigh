const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'public', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Fungsi untuk membuat link gambar Unsplash berdasarkan judul
function getCoverUrl(title) {
  const keywords = encodeURIComponent(title.replace('.pdf', '').replace(/Pemrograman|Dasar|Panduan|Buku|Modern|Fundamental|Teknologi|Jaringan|Data|Cloud|Keamanan|Sistem|Desain|Machine Learning|AI|Android|iOS|Game|Web|Database|Matlab|R|Ruby|Go|Swift|Kotlin|PHP|JavaScript|TypeScript|Perl|Scala|Rust|Haskell|Lua|Dart|Assembly|Shell Script|Objective-C|Fortran|Pascal|COBOL|Prolog|Lisp|Ada|SQL|PL\\/SQL|T-SQL|NoSQL|MongoDB|Redis|Cassandra|Hadoop|Spark|TensorFlow|PyTorch|Keras|Scikit-Learn|Matplotlib|Seaborn|Pandas|Numpy|OpenCV|Flask|Django|FastAPI|SpringBoot|Laravel|CodeIgniter|RubyonRails|Express.js|Vue.js|React.js|Angular|Svelte|Next.js|Nuxt.js|Gatsby.js|Electron/gi, '').trim());
  return `https://source.unsplash.com/400x600/?${keywords}`;
}

// Update cover untuk setiap buku
html = html.replace(/(cover:\s*")[^"]*(",\s*\n\s*desc:)/g, (match, p1, p2, offset, string) => {
  // Cari title sebelumnya
  const before = string.slice(0, offset);
  const titleMatch = before.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : 'buku';
  return `${p1}${getCoverUrl(title)}${p2}`;
});

fs.writeFileSync(filePath, html, 'utf8');
console.log('Cover buku berhasil diupdate!');