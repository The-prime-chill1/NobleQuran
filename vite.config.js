import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Automatically sync any user-uploaded aesthetic Quranic images to public
const conversationId = '6a27c566-b0ef-4136-aa23-73b7aea2bed8'
const uploadDir = `C:/Users/Hp/.gemini/antigravity-ide/brain/${conversationId}/.user_uploaded`

try {
  if (fs.existsSync(uploadDir)) {
    const files = fs.readdirSync(uploadDir)
    files.forEach(file => {
      const src = path.join(uploadDir, file)
      const dest = path.resolve(__dirname, 'public', file)
      fs.copyFileSync(src, dest)
    })
    // Named aliases for styling
    const aliasMap = {
      'media_1791104483627.png': 'islamic-pattern.png',
      'media_1791104634922.png': 'cinematic-hero.png',
      'media_1791104900063.png': 'quran-path.png',
      'media_1791104922091.png': 'quran-dawn.png',
      'media_1791105008366.png': 'mosque-domes.png',
      'media_1791108518118.png': 'grand-mosque-hero.png',
    }
    for (const [srcName, destName] of Object.entries(aliasMap)) {
      const srcFile = path.join(uploadDir, srcName)
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, path.resolve(__dirname, 'public', destName))
      }
    }
    console.log(`[Vite] Synced all ${files.length} user-supplied aesthetic assets to public directory`)
  }
} catch (e) {
  console.error('[Vite] Could not sync assets:', e)
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  }
})

