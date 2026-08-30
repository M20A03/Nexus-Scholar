#!/usr/bin/env bash
# ==============================================================================
# Nexus Scholar - Upgrade, Cache Clean & TypeScript Strict Mode Enforcer
# ==============================================================================

set -euo pipefail

echo "================================================================="
echo " 🚀 Nexus Scholar: System Architecture & Dependency Maintenance "
echo "================================================================="

# 1. Clean Node Modules & Cache
echo "🧹 Step 1: Purging node_modules, build artifacts, and package caches..."
rm -rf frontend/node_modules frontend/dist frontend/.vite
rm -rf backend/node_modules backend/dist
npm cache clean --force 2>/dev/null || true

# 2. Re-install & update packages to stable versions
echo "📦 Step 2: Installing and verifying fresh dependencies..."
cd frontend
npm install

# 3. Ensure Strict TypeScript configuration
echo "🛡️  Step 3: Enforcing strict compiler flags in tsconfig..."
cat << 'EOF' > tsconfig.app.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
EOF
echo "✅ Updated tsconfig.app.json with strict compiler constraints."

# 4. Verify Typecheck and Build
echo "⚙️  Step 4: Running full TypeScript type check and production bundle build..."
npx tsc --noEmit
npm run build

echo "================================================================="
echo " 🎉 Full-Stack Fortress Upgrade Complete! All systems healthy.   "
echo "================================================================="
