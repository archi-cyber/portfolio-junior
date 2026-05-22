# Portfolio — Junior Dokmegho Tefo

Site web portfolio personnel construit avec **React + Vite + Tailwind CSS**.
Déployé automatiquement sur GitHub Pages via GitHub Actions.

---

## 🚀 Démarrage rapide en local

Tu as besoin de **Node.js 18 ou plus** installé sur ta machine. Vérifie avec :

```bash
node --version
npm --version
```

Si Node n'est pas installé, télécharge-le sur [nodejs.org](https://nodejs.org).

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:5173**

### Construire pour la production

```bash
npm run build
```

Les fichiers prêts à déployer sont générés dans le dossier `dist/`.

Pour prévisualiser le build :

```bash
npm run preview
```

---

## 🌐 Déploiement sur GitHub Pages — Procédure complète

### Étape 1 — Créer un dépôt GitHub

1. Va sur [github.com/new](https://github.com/new)
2. Nomme ton dépôt (recommandé : `portfolio-junior` ou `portfolio`)
3. Choisis **Public** (obligatoire pour GitHub Pages gratuit)
4. Clique **Create repository**

### Étape 2 — Ajuster le `base` dans `vite.config.js`

Ouvre `vite.config.js` et change la valeur de `base` pour qu'elle corresponde **exactement** au nom de ton dépôt GitHub :

```javascript
base: '/portfolio-junior/',  // remplace par '/nom-de-ton-repo/'
```

⚠️ **Important** : les slashs au début et à la fin sont obligatoires.

> Si tu veux que le site soit à la racine (`username.github.io`), nomme ton dépôt `archi-cyber.github.io` et mets `base: '/'`.

### Étape 3 — Pousser le code sur GitHub

Dans le terminal, depuis le dossier du projet :

```bash
# Initialiser git
git init
git branch -M main

# Lier au dépôt distant (remplace l'URL par la tienne)
git remote add origin https://github.com/archi-cyber/portfolio-junior.git

# Premier commit et push
git add .
git commit -m "Initial portfolio commit"
git push -u origin main
```

### Étape 4 — Activer GitHub Pages

1. Sur GitHub, va dans ton dépôt → **Settings** → **Pages** (menu de gauche)
2. Sous **Source**, sélectionne **GitHub Actions**
3. C'est tout — pas besoin de choisir une branche, le workflow s'en occupe.

### Étape 5 — Attendre le déploiement

1. Va dans l'onglet **Actions** de ton dépôt
2. Tu verras le workflow `Deploy to GitHub Pages` en cours d'exécution (durée : ~2-3 minutes)
3. Une fois terminé (coche verte), ton site est en ligne à :

```
https://archi-cyber.github.io/portfolio-junior/
```

(remplace par ton username et ton nom de repo)

---

## ✏️ Modifier le contenu

Toutes les données du site sont dans `src/App.jsx` au début du fichier, dans les constantes :

- `PROFILE` — nom, rôle, contact, etc.
- `STATS` — chiffres affichés sur le hero
- `EXPERIENCES` — expériences professionnelles
- `PROJECTS` — projets (avec `featured: true` pour mettre en avant)
- `SKILL_GROUPS` — compétences par catégorie
- `CERTIFICATIONS` — certifications
- `EDUCATION` — formation académique

Pour ajouter un projet, copie-colle un objet existant dans `PROJECTS` et adapte les champs.

Chaque `git push` sur `main` redéploie automatiquement le site grâce au workflow dans `.github/workflows/deploy.yml`.

---

## 🎨 Personnaliser le design

Les couleurs et fontes sont dans `tailwind.config.js` :

```javascript
colors: {
  cream: '#f5f1ea',      // fond principal
  ink: '#1a1815',        // texte principal
  accent: '#d96b3c',     // accent orange brûlé
  // ...
}
```

Pour changer l'accent (par ex. en vert forêt) :

```javascript
accent: '#2d4a3e',
```

Les fontes sont chargées via Google Fonts dans `index.html`.

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| **Vite** | Build tool ultra-rapide |
| **React 18** | Framework UI |
| **Tailwind CSS** | Utility-first CSS |
| **Fraunces** | Police d'affichage (serif) |
| **Manrope** | Police de corps |
| **JetBrains Mono** | Police technique |
| **GitHub Actions** | CI/CD automatique |
| **GitHub Pages** | Hébergement gratuit |

---

## 📝 Licence

© 2026 Junior Dokmegho Tefo. Tous droits réservés sur le contenu.
Code source libre d'inspiration.
