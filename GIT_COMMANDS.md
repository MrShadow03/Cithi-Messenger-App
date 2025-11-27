# Git Commands for Deployment

## Initial Setup (if not done already)

```bash
# Check if git is initialized
git status

# If not initialized, initialize git
git init

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/chandan-d-karmaker/Cithi-Messenger-App.git

# Or if already exists, update it
git remote set-url origin https://github.com/chandan-d-karmaker/Cithi-Messenger-App.git
```

## First Time Push

```bash
# Check current status
git status

# Add all files
git add .

# Commit with message
git commit -m "Transform to Next.js with real-time chat capabilities"

# Push to GitHub
git push -u origin main

# If main branch doesn't exist, try:
git push -u origin master
```

## After Making Changes

```bash
# Check what changed
git status

# Add changes
git add .

# Commit
git commit -m "Description of your changes"

# Push
git push
```

## Common Issues

### Issue: Branch name mismatch
```bash
# Check current branch
git branch

# Rename to main if needed
git branch -M main

# Push
git push -u origin main
```

### Issue: Remote already exists
```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/chandan-d-karmaker/Cithi-Messenger-App.git
```

### Issue: Divergent branches
```bash
# Pull and merge
git pull origin main --allow-unrelated-histories

# Or force push (use carefully!)
git push -f origin main
```

## Quick Deploy Steps

```bash
# 1. Check status
git status

# 2. Add all files
git add .

# 3. Commit
git commit -m "Ready for deployment"

# 4. Push to GitHub
git push origin main

# 5. Go to Railway.app and connect your repo
```

## Verify Before Pushing

```bash
# Make sure build works
npm run build

# Check what will be committed
git status

# Review changes
git diff
```

That's it! Once pushed to GitHub, Railway will automatically deploy your app.
