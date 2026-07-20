import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const I18N_DIR = path.join(__dirname, '../src/i18n');
const LANGUAGES = ['en', 'fa', 'ar'];
const BASE_LANG = 'fa'; // Persian is default / base language

function getJsonFiles(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsonFiles(filePath, baseDir));
    } else if (file.endsWith('.json')) {
      results.push(path.relative(baseDir, filePath));
    }
  });
  return results;
}

// Compare keys recursively
function compareKeys(baseObj, targetObj, prefix = '') {
  const missingKeys = [];
  
  for (const key in baseObj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (!(key in targetObj)) {
      missingKeys.push(fullKey);
    } else if (typeof baseObj[key] === 'object' && baseObj[key] !== null) {
      if (typeof targetObj[key] !== 'object' || targetObj[key] === null) {
        missingKeys.push(`${fullKey} (Type mismatch)`);
      } else {
        missingKeys.push(...compareKeys(baseObj[key], targetObj[key], fullKey));
      }
    }
  }
  
  return missingKeys;
}

function runCheck() {
  console.log('🌐 Checking translations consistency...\n');
  const baseFiles = getJsonFiles(path.join(I18N_DIR, BASE_LANG));
  
  let hasErrors = false;

  baseFiles.forEach((relPath) => {
    const baseFilePath = path.join(I18N_DIR, BASE_LANG, relPath);
    let baseContent;
    try {
      baseContent = JSON.parse(fs.readFileSync(baseFilePath, 'utf-8'));
    } catch (e) {
      console.error(`❌ Error parsing base translation file: ${BASE_LANG}/${relPath}`);
      hasErrors = true;
      return;
    }

    LANGUAGES.forEach((lang) => {
      if (lang === BASE_LANG) return;

      const targetFilePath = path.join(I18N_DIR, lang, relPath);

      if (!fs.existsSync(targetFilePath)) {
        console.error(`❌ Missing file: ${lang}/${relPath}`);
        hasErrors = true;
        return;
      }

      let targetContent;
      try {
        targetContent = JSON.parse(fs.readFileSync(targetFilePath, 'utf-8'));
      } catch (e) {
        console.error(`❌ Error parsing target translation file: ${lang}/${relPath}`);
        hasErrors = true;
        return;
      }

      const missing = compareKeys(baseContent, targetContent);
      if (missing.length > 0) {
        console.error(`❌ Mismatched/Missing keys in ${lang}/${relPath}:`);
        missing.forEach((k) => console.error(`   - ${k}`));
        hasErrors = true;
      }
    });
  });

  if (hasErrors) {
    console.log('\n❌ Translation checks failed.');
    process.exit(1);
  } else {
    console.log('✅ All translations are synchronized successfully across all languages!');
    process.exit(0);
  }
}

runCheck();
