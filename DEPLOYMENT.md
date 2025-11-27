# Railway Deployment Guide

## Quick Deploy to Railway

### Option 1: One-Click Deploy (Recommended)

1. Fork this repository to your GitHub account
2. Visit [Railway.app](https://railway.app)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your forked repository
6. Railway will automatically build and deploy

### Option 2: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

## Post-Deployment Configuration

### 1. Environment Variables

Set these in Railway Dashboard → Your Project → Variables:

```
JWT_SECRET=your-super-secret-random-string-here
NODE_ENV=production
```

### 2. Database Persistence

**Important**: Railway's free tier includes ephemeral storage, meaning your `db.json` file will reset on redeployments.

To persist data:

#### Option A: Railway Volume (Recommended for Free Tier)

1. Go to Railway Dashboard → Your Project
2. Click **"Settings"**
3. Scroll to **"Volumes"**
4. Click **"Add Volume"**
5. Set **Mount Path**: `/app`
6. The database file will persist across deployments

#### Option B: Upgrade to Paid Storage

For production use, consider:
- Railway Pro (persistent storage included)
- External database (PostgreSQL/MongoDB)

### 3. Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Click **"Generate Domain"** for free Railway domain
3. Or add your custom domain

## Testing Your Deployment

1. Visit your Railway URL (e.g., `https://your-app.up.railway.app`)
2. Register a new account
3. Open in another browser/incognito window
4. Register another account
5. Start chatting between the two accounts
6. Messages should appear in real-time

## Free Tier Limits

Railway free tier includes:
- ✅ 500 execution hours/month
- ✅ 1GB RAM
- ✅ Shared CPU
- ✅ 100GB network bandwidth
- ⚠️ Ephemeral storage (unless using volumes)

**Tips to stay within free limits:**
- App sleeps after 30 minutes of inactivity (good for demos)
- Wakes up automatically on new requests
- Perfect for personal projects and testing

## Monitoring

In Railway Dashboard:
- **Deployments**: View build logs and deployment history
- **Metrics**: Monitor CPU, memory, and network usage
- **Logs**: Real-time application logs

## Troubleshooting

### Build Fails

1. Check build logs in Railway dashboard
2. Ensure all dependencies are in `package.json`
3. Verify `railway.json` configuration

### Can't Connect to Socket.IO

1. Ensure your app is using HTTPS (Railway provides this automatically)
2. Check browser console for WebSocket errors
3. Verify Socket.IO path in client matches server

### Database Resets on Deploy

1. Add a persistent volume (see Option A above)
2. Mount path should be `/app`
3. Redeploy after adding volume

### App Crashes

1. Check logs in Railway dashboard
2. Verify environment variables are set
3. Ensure Node.js version compatibility

## Updating Your Deployment

### Automatic Updates (Recommended)

Railway automatically redeploys when you push to your GitHub repo:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Railway will automatically:
1. Detect the push
2. Build your application
3. Deploy the new version
4. Zero-downtime deployment

### Manual Redeploy

1. Go to Railway Dashboard
2. Click on your project
3. Click **"Deploy"** → **"Redeploy"**

## Cost Optimization

To maximize free tier usage:

1. **Enable Automatic Sleep**: Railway does this by default
2. **Optimize Build**: Keep dependencies minimal
3. **Use Volumes**: Prevent data loss without upgrade
4. **Monitor Usage**: Check dashboard regularly

## Scaling Up

When you outgrow free tier:

### Upgrade to Railway Pro ($5/month)
- Persistent disk storage
- No sleep after inactivity
- Priority support
- More execution hours

### Migrate Database
Consider moving to:
- **PostgreSQL** (Railway add-on)
- **MongoDB Atlas** (free tier available)
- **Supabase** (PostgreSQL with real-time)

Update `lib/database.ts` to use your chosen database.

## Support

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Project Issues**: https://github.com/chandan-d-karmaker/Cithi-Messenger-App/issues

## Next Steps

After successful deployment:

1. ✅ Test all features (registration, login, messaging)
2. ✅ Share your app URL with friends
3. ✅ Monitor usage in Railway dashboard
4. ✅ Consider adding more features (see README.md)
5. ✅ Set up custom domain (optional)

---

**Congratulations!** Your messenger app is now live on Railway! 🎉
