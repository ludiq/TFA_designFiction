# Workflow front-end avec Vite

## Pourquoi Vite plutôt que Laravel Mix ?

Ce projet utilisait à l'origine **Laravel Mix 6**, un outil basé sur Webpack conçu pour les projets Laravel (PHP). Voici pourquoi on l'a remplacé :

1. **Laravel Mix est déprécié.** Le projet n'est plus maintenu depuis 2022. Il ne reçoit plus de mises à jour de sécurité ni de compatibilité.
2. **Mix est conçu pour Laravel, pas pour du HTML/CSS/JS pur.** Utiliser Mix sans Laravel, c'est embarquer toute la complexité de Webpack (config, loaders, plugins) sans aucun des avantages du framework PHP.
3. **Webpack est lent.** Chaque modification recompilait tout le projet. Sur un gros projet, ça peut prendre plusieurs secondes.
4. **Vite est l'outil moderne standard.** Créé par Evan You (créateur de Vue.js), Vite est adopté par React, Svelte, et même Laravel lui-même a remplacé Mix par Vite depuis Laravel 9.

### Ce que Vite fait mieux

| | Laravel Mix (Webpack) | Vite |
|---|---|---|
| Démarrage serveur dev | ~3-5 secondes | ~80 millisecondes |
| Rechargement à chaud (HMR) | Recompile tout | Met à jour uniquement le fichier modifié |
| Config nécessaire | webpack.mix.js + .babelrc + BrowserSync | vite.config.js (quelques lignes) |
| Nombre de dépendances | ~500 paquets | ~25 paquets |
| Support SCSS | Nécessite sass-loader + config | Natif (il suffit d'avoir `sass` installé) |
| Support ES modules | Nécessite Babel pour transpiler | Natif (les navigateurs modernes les supportent) |

---

## Ce qui a été modifié dans le projet

### Fichiers supprimés

- `webpack.mix.js` — la config Webpack/Mix, remplacée par `vite.config.js`
- `.babelrc` — Babel n'est plus nécessaire (Vite utilise esbuild, beaucoup plus rapide)

### Fichiers créés

- `vite.config.js` — configure Vite pour servir depuis le dossier `src/` et builder vers `dist/`

### Fichiers modifiés

- **`package.json`** — nouvelles dépendances (`vite`, `sass`), nouveaux scripts, suppression de tout ce qui était lié à Mix/Webpack/BrowserSync
- **`src/index.html`** — les liens CSS/JS pointent maintenant vers les fichiers *sources* (pas les fichiers compilés) :
  - `href="styles/app.css"` → `href="/styles/app.scss"` (Vite compile le SCSS à la volée)
  - `<script src="scripts/app.js" defer>` → `<script type="module" src="/scripts/app.js">` (module ES natif)
- **`src/styles/app.scss`** — `@import` remplacé par `@use` (nouvelle syntaxe Sass recommandée)
- **`src/styles/components/_type.scss`** et **`_content.scss`** — ajout de `@use '../utils/variables' as *` car avec `@use`, chaque fichier doit déclarer ses propres imports
- **`src/scripts/app.js`** — suppression de `"use strict"` (redondant avec les modules ES)
- **`.nvmrc`** — Node 20 au lieu de 16.9 (Vite requiert Node 18 minimum)

---

## Utilisation au quotidien

### Prérequis : installer la bonne version de Node

Vite nécessite **Node.js 18 ou supérieur**. Pour gérer facilement plusieurs versions de Node, installe **nvm** (Node Version Manager) :

```bash
# Installer nvm (macOS / Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Redémarre ton terminal, puis :
nvm install 20
nvm use 20

# Vérifie
node --version  # doit afficher v20.x.x
```

> **Astuce :** Le fichier `.nvmrc` à la racine du projet indique la version requise. Quand tu ouvres le projet, tape simplement `nvm use` et nvm basculera automatiquement sur la bonne version.

### Installer les dépendances

```bash
npm install
```

### Commandes disponibles

| Commande | Ce qu'elle fait |
|----------|----------------|
| `npm run dev` | Lance le serveur de développement avec rechargement automatique (HMR). Ouvre `http://localhost:5173` dans ton navigateur. |
| `npm run build` | Compile et optimise le projet pour la mise en ligne. Génère le dossier `dist/`. |
| `npm run preview` | Sert le contenu du dossier `dist/` en local pour vérifier le build avant déploiement. |

### Workflow de développement

1. `npm run dev` → ton site s'affiche dans le navigateur
2. Tu modifies un fichier `.scss`, `.js` ou `.html` → le navigateur se met à jour instantanément
3. Quand tu es satisfait·e → `npm run build` pour générer la version finale

---

## Comprendre la syntaxe Sass `@use` (vs `@import`)

L'ancienne syntaxe `@import` chargeait tout dans un scope global. La nouvelle syntaxe `@use` est plus propre :

```scss
/* Avant (déprécié) */
@import 'utils/variables';
/* → toutes les variables sont disponibles partout, effet de bord */

/* Maintenant */
@use '../utils/variables' as *;
/* → les variables sont importées explicitement dans CE fichier */
```

Chaque fichier SCSS qui a besoin de variables doit les importer lui-même. C'est plus verbeux mais ça évite les conflits et rend le code plus lisible.

---

## Pour démarrer un nouveau projet avec Vite

```bash
# Crée un dossier et initialise
mkdir mon-projet && cd mon-projet
npm init -y

# Installe Vite et Sass
npm install --save-dev vite sass

# Crée la structure
mkdir -p src/styles src/scripts src/assets
touch src/index.html src/styles/app.scss src/scripts/app.js
```

Crée un `vite.config.js` à la racine :

```js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
```

Ajoute les scripts dans `package.json` :

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

Et dans ton `src/index.html`, lie directement tes fichiers sources :

```html
<link rel="stylesheet" href="/styles/app.scss">
<script type="module" src="/scripts/app.js"></script>
```

C'est tout. Pas de config Webpack, pas de Babel, pas de BrowserSync. Vite s'occupe de tout.
