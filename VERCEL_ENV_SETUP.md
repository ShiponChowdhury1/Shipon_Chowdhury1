# Vercel Environment Variables Setup

Please add these environment variables in your Vercel dashboard:

1. Go to: https://vercel.com/your-project/settings/environment-variables

2. Add the following variables:

## MongoDB Connection
```
MONGODB_URI=mongodb+srv://Rahik_Ahsan:PchyiQ8jBzk9r9Aj@cluster0.uoyoyb2.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
```

## NextAuth Configuration
```
NEXTAUTH_URL=https://rahik-ahsan-x3t3.vercel.app
```

```
NEXTAUTH_SECRET=super-secret-key-change-in-production-2025-rahik-ahsan-admin
```

## Admin Credentials
```
ADMIN_EMAIL=ahikahsan@gmail.com
```

```
ADMIN_PASSWORD=$2b$12$gSHGjhwIneiaKckUBnWpiuPgRRAZ/rhf90YxyuWS.JvLhzOiyieLe
```

## EmailJS Configuration
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_qy7zi3h
```

```
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_syo37on
```

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sok3Wn775k0Kx5WO5
```

## Cloudinary Configuration
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dau8sazoh
```

```
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=reviews_photos
```

## Important Notes:

1. Make sure to set `NEXTAUTH_URL` to your actual Vercel deployment URL
2. After adding these variables, **redeploy** your application
3. The admin credentials are:
   - Email: `ahikahsan@gmail.com`
   - Password: `Portfolio1818911#`

## Deployment Steps:

1. Add all environment variables in Vercel dashboard
2. Push your code to GitHub (if using Git)
3. Trigger a new deployment or wait for auto-deployment
4. Once deployed, visit: `https://your-domain.vercel.app/admin/login`
5. Login and you should be redirected to `/admin/dashboard`
