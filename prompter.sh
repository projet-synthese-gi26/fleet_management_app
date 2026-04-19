#!/bin/bash

# Script pour générer un fichier de contexte complet pour un projet Next.js
OUTPUT_FILE="project_context.txt"
PROJECT_ROOT="."

echo "🚀 Génération du contexte pour le projet Next.js..."

echo "# Contexte du Projet : Next.js Application" > "$OUTPUT_FILE"
echo "Généré le : $(date)" >> "$OUTPUT_FILE"
echo "Framework : Next.js (React)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# 1. Arborescence
echo "## 1. Arborescence du Projet" >> "$OUTPUT_FILE"
echo "\`\`\`" >> "$OUTPUT_FILE"
# On ignore les dossiers lourds et inutiles pour le contexte
tree -a -I 'node_modules|.next|.git|dist|build|.vscode|.DS_Store|coverage' "$PROJECT_ROOT" >> "$OUTPUT_FILE"
echo "\`\`\`" >> "$OUTPUT_FILE"

# 2. Contenu des fichiers
echo "## 2. Contenu des Fichiers" >> "$OUTPUT_FILE"

# Sélection des extensions pertinentes pour Next.js/Web
find "$PROJECT_ROOT" -type f \( \
    -name "package.json" -o \
    -name "next.config.js" -o \
    -name "next.config.mjs" -o \
    -name "tailwind.config.*" -o \
    -name "tsconfig.json" -o \
    -name "*.ts" -o \
    -name "*.tsx" -o \
    -name "*.js" -o \
    -name "*.jsx" -o \
    -name "*.css" -o \
    -name "*.prisma" -o \
    -name ".env.example" \
\) | grep -v -e 'node_modules/' -e '.next/' -e '.git/' -e 'dist/' | while read -r file; do
    
    echo "" >> "$OUTPUT_FILE"
    echo "---" >> "$OUTPUT_FILE"
    echo "### Fichier : \`$file\`" >> "$OUTPUT_FILE"
    
    # Détection de l'extension pour la coloration syntaxique du markdown
    EXT="${file##*.}"
    [[ "$EXT" == "tsx" || "$EXT" == "ts" ]] && LANG="typescript" || LANG="$EXT"
    
    echo "\`\`\`$LANG" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
done

echo "✅ Contexte généré avec succès dans : $OUTPUT_FILE"