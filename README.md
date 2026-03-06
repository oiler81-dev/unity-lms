# Unity Front Desk Quiz App

GitHub + Azure Static Web Apps build for the **UNITY MSK Front Desk Check-In Assessment**.

## What this build does
- Uses **Microsoft Entra ID / Azure sign-in** through Static Web Apps auth
- Hosts the quiz in a GitHub repo and deploys cleanly to Azure Static Web Apps
- Tracks:
  - time spent per attempt
  - number of attempts
  - score per attempt
  - average score per user
  - pass/fail history
- Requires a **90%+ passing score**
- Reorders questions on retake
- Reveals correct answers for missed questions after a failed attempt
- Triggers notification logic on the **third failed attempt**
- Includes an **admin dashboard**
- Built to scale to additional quizzes later

## Folder structure
- `public/` front-end files
- `api/` Azure Functions
- `staticwebapp.config.json` auth + route rules

## Important notes
1. `admin.html` is auth-protected in this build, but the **real admin restriction** is controlled by the server.
2. Server-side admin access uses `ADMIN_EMAILS` from environment variables.
3. This build supports:
   - Azure Table Storage for production
   - in-memory fallback for light local testing only
4. Third-fail notifications support either:
   - `LOGIC_APP_FAILURE_WEBHOOK`, or
   - Azure Communication Services email

## Azure resources to create
1. **Azure Static Web App** connected to this GitHub repo
2. **Storage account** with Table Storage enabled
3. Optional:
   - **Azure Communication Services Email**, or
   - **Logic App webhook** for notification

## Required app settings
Set these in Azure Static Web Apps > Environment variables.

### Storage
Either use the connection string:
- `AZURE_STORAGE_CONNECTION_STRING`

Or use the individual settings:
- `AZURE_STORAGE_ACCOUNT_NAME`
- `AZURE_STORAGE_ACCOUNT_KEY`
- `AZURE_TABLES_ENDPOINT`

### Admin security
- `ADMIN_EMAILS=mvargas@unitymsk.com,anotheradmin@unitymsk.com`

### Notification options
Option A - webhook
- `LOGIC_APP_FAILURE_WEBHOOK=https://...`

Option B - Azure Communication Services Email
- `ACS_EMAIL_CONNECTION_STRING=...`
- `ACS_EMAIL_SENDER=DoNotReply@yourverifieddomain.com`

## Authentication setup
In Azure Static Web Apps:
1. Open your Static Web App
2. Go to **Authentication**
3. Add **Microsoft Entra ID** provider
4. Restrict access to your organization tenant
5. Confirm `/.auth/login/aad` works

## Admin setup
This build treats a signed-in user as admin only when their email exists in `ADMIN_EMAILS`.

## Local dev notes
For local Function testing, install:
- Node.js 20+
- Azure Functions Core Tools

Then:
```bash
cd api
npm install
func start
```

Serve the `public` folder separately if needed.

## Next improvements worth doing
- add quiz assignment by department
- add due dates / recertification windows
- add CSV export from admin dashboard
- move quiz definitions into Azure Table or Blob storage instead of code
- add attempt detail drill-down page
- add admin role from Entra group claims instead of email env var list
