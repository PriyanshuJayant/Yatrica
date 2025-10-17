# 🚀 Vercel Deployment Fix

## ✅ What Was Fixed:

1. **Directory Structure:** Moved serverless function to lowercase `api/` directory (Vercel requirement)
2. **Configuration:** Updated `vercel.json` to point to correct path
3. **Environment Variables:** Updated to support both local and production environments

## 📋 Deployment Checklist:

### Before Deploying:

- [x] Serverless function is in `api/sendEmail.js` (lowercase `api`)
- [x] `vercel.json` updated with correct path
- [x] Code supports both `EMAIL_USER` and `VITE_EMAIL_USER` env variables
- [ ] Local `.env` file has `VITE_EMAIL_USER` and `VITE_EMAIL_PASS`

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Environment Variables**

2. Add these variables:
   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASS = your-app-password
   ```

3. **Important:** Use `EMAIL_USER` and `EMAIL_PASS` (without `VITE_` prefix) in Vercel!

### Deploy:

```bash
# Option 1: Deploy via Vercel CLI
vercel --prod

# Option 2: Push to GitHub (if connected to Vercel)
git add .
git commit -m "Fix email serverless function for Vercel"
git push origin main
```

## 📁 Current File Structure:

```
FrontEnd/
├── api/                    # ✅ Lowercase (Vercel requirement)
│   └── sendEmail.js       # ✅ Serverless function
├── vercel.json            # ✅ Updated configuration
├── .env                   # Local dev (VITE_EMAIL_USER, VITE_EMAIL_PASS)
└── .env.example           # Template
```

## 🔧 Environment Variables:

| Environment | Variable Name | Used In |
|------------|---------------|---------|
| **Local Dev** | `VITE_EMAIL_USER` | `.env` file |
| **Local Dev** | `VITE_EMAIL_PASS` | `.env` file |
| **Vercel Prod** | `EMAIL_USER` | Vercel Dashboard |
| **Vercel Prod** | `EMAIL_PASS` | Vercel Dashboard |

**The code checks both!** It will use `EMAIL_USER` first (production), then fall back to `VITE_EMAIL_USER` (local).

## ✨ Test Locally First:

```bash
# 1. Make sure nodemailer is installed
npm install nodemailer

# 2. Update .env with your credentials
VITE_EMAIL_USER=your-email@gmail.com
VITE_EMAIL_PASS=your-app-password

# 3. Run dev server
npm run dev

# 4. Test the contact form at http://localhost:5173/contact
```

## 🎯 After Deployment:

1. Visit your Vercel deployment URL
2. Go to the Contact page
3. Fill and submit the form
4. Check both emails arrive (user confirmation + admin notification)

## ⚠️ Common Issues:

### "Function not found" error:
- Make sure the function is in `api/` (lowercase)
- Verify `vercel.json` has correct path

### "Invalid credentials" error:
- Check environment variables in Vercel dashboard
- Use `EMAIL_USER` and `EMAIL_PASS` (no VITE_ prefix)
- Make sure you're using Gmail App Password, not regular password

### Emails not sending:
- Check Vercel function logs in dashboard
- Verify Gmail App Password is correct
- Check spam folder for test emails

## 📝 What Changed:

**Before:**
- Function was in `API/sendEmail.js` (uppercase)
- Only used `VITE_EMAIL_USER` variables
- Vercel couldn't find the function

**After:**
- Function in `api/sendEmail.js` (lowercase)
- Supports both `EMAIL_USER` and `VITE_EMAIL_USER`
- Works in both local and production environments

---

**Ready to deploy!** Just add the environment variables to Vercel and push your code. 🚀
