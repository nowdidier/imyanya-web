# 🚀 JobSearchWebsite - Job Recruitment & Search Web Application

## `Dependencies`

```bash
"@emotion/react": "^11.10.6",
"@emotion/styled": "^11.10.6",
"@fontsource/open-sans": "^4.5.14",
"@fontsource/public-sans": "^4.5.12",
"@fontsource/roboto": "^4.5.8",
"@fortawesome/fontawesome-svg-core": "^6.3.0",
"@fortawesome/free-regular-svg-icons": "^6.4.0",
"@fortawesome/free-solid-svg-icons": "^6.3.0",
"@fortawesome/react-fontawesome": "^0.2.0",
"@goongmaps/goong-map-react": "^1.1.2",
"@hookform/resolvers": "^2.9.11",
"@mui/base": "^5.0.0-alpha.119",
"@mui/icons-material": "^5.11.11",
"@mui/lab": "^5.0.0-alpha.122",
"@mui/material": "^5.11.11",
"@mui/styled-engine-sc": "^5.11.11",
"@mui/x-date-pickers": "^6.0.1",
"@react-pdf-viewer/core": "^3.12.0",
"@react-pdf-viewer/get-file": "^3.12.0",
"@react-pdf-viewer/zoom": "^3.12.0",
"@react-pdf/renderer": "^3.1.9",
"@reduxjs/toolkit": "^1.9.3",
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"@tippyjs/react": "^4.2.6",
"antd": "^5.4.7",
"antd-img-crop": "^4.12.2",
"axios": "^1.3.4",
"chart.js": "^4.3.0",
"dayjs": "^1.11.7",
"dotenv-webpack": "^8.0.1",
"draft-js": "^0.11.7",
"draftjs-to-html": "^0.9.1",
"firebase": "^9.21.0",
"js-cookie": "^3.0.1",
"leaflet": "^1.9.4",
"material-ui-popup-state": "^5.0.5",
"mdb-react-ui-kit": "^6.1.0",
"moment": "^2.29.4",
"moment-timezone": "^0.5.43",
"mui-file-dropzone": "^4.0.2",
"mui-image": "^1.0.7",
"pdfjs-dist": "^3.4.120",
"query-string": "^8.1.0",
"react": "^18.2.0",
"react-chartjs-2": "^5.2.0",
"react-color": "^2.19.3",
"react-dom": "^18.2.0",
"react-draft-wysiwyg": "^1.15.0",
"react-dropzone": "^14.2.3",
"react-geolocated": "^4.0.3",
"react-hook-form": "^7.43.4",
"react-icons": "^5.5.0",
"react-image-gallery": "^1.2.11",
"react-infinite-scroll-component": "^6.1.0",
"react-leaflet": "^4.2.1",
"react-moment": "^1.1.3",
"react-redux": "^8.0.5",
"react-router-dom": "^6.8.2",
"react-scripts": "5.0.1",
"react-share": "^4.4.1",
"react-to-print": "^2.14.12",
"react-toastify": "^9.1.1",
"reactjs-social-login": "^2.6.2",
"recharts": "^2.4.3",
"sass": "^1.69.5",
"styled-components": "^5.3.8",
"sweetalert2": "^11.7.3",
"swiper": "^9.1.0",
"web-vitals": "^2.1.4",
"xlsx": "https://cdn.sheetjs.com/xlsx-0.19.2/xlsx-0.19.2.tgz",
"yup": "^1.0.2"
```

## `devDependencies`

```bash
"@craco/craco": "^7.1.0",
"compression-webpack-plugin": "^11.1.0",
"terser-webpack-plugin": "^5.3.14",
"thread-loader": "^4.0.4"
```

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Installation Guide](#-installation-guide)
3. [Environment Variables Configuration](#-environment-variables-configuration)
4. [Data Configuration](#-data-configuration)

---

## 🎯 Introduction

**JobSearchWebsite** is a platform connecting employers and job seekers, including:

- 👨‍💼 **Job seeker interface**: `https://www.myjob.com`
- 🏢 **Employer interface**: `https://employer.myjob.com`

---

## 📦 Installation Guide

### Step 1: Clone the Project

```bash
# Clone repository
git clone https://github.com/Tam-Vu/JobSearchWebsite.git

# Navigate to project directory
cd my-job-web-app

# Create environment configuration file from template
cp .env.example .env
```

### Step 2: Configure Environment Variables

1. Open the newly created `.env` file
2. Fill in all configuration information according to the guide below
3. Save the file

### Step 3: Configure Nginx

1. Copy file `default.conf.example` → `default.conf`
2. Update `<ngrok domain>` in the file with the ngrok domain configured in Backend

   Example: `<ngrok domain>` → `sought-shiner-utterly.ngrok-free.app`

### Step 4: Launch Application

```bash
# Build and run application with Docker
docker-compose up -d --build
```

> **Note**: Ensure Docker and Docker Compose are installed on your machine.

### Step 5: Domain Simulation

Allow www.myjob.com and employer.myjob.com to replace localhost (127.0.0.1)

**For Windows:**

Navigate to `C:\Windows\System32\drivers\etc\`
Add the above 2 lines to the `hosts` file (Open with administrator privileges)

### Step 6: Verify Results

After successful launch, access:

- 🌐 **Job seeker page**: https://www.myjob.com
- 🌐 **Employer page**: https://employer.myjob.com

---

## ⚙️ Environment Variables Configuration

### 1. GOONG Maps API

GOONG Maps is used to display maps and addresses.

**Required environment variables:**

```env
VITE_GOONGAPI_KEY=<API_Key>
```

**Configuration steps:**

1. Access [GOONG Maps](https://account.goong.io/) and register an account
2. In Dashboard → Create a new API Key
3. Copy the API Key and paste it into the `VITE_GOONGAPI_KEY` variable in the `.env` file

---

### 2. Firebase Configuration

Firebase serves notification and chat functionality.

**Required environment variables:**

```env
VITE_FIREBASE_API_KEY=<API_Key>
VITE_FIREBASE_AUTH_DOMAIN=<Auth_Domain>
VITE_FIREBASE_PROJECT_ID=<Project_ID>
VITE_FIREBASE_STORAGE_BUCKET=<Storage_Bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<Sender_ID>
VITE_FIREBASE_APP_ID=<App_ID>
```

**Configuration steps:**

Copy the entire Firebase configuration from the **Backend** `.env` file (already set up previously) and paste it into the Frontend `.env` file.

---

### 3. OAuth2 Authentication

Configure Client ID and Client Secret for login methods.

#### 3.1. Login With Email & Password

**Required environment variables:**

```env
VITE_MYJOB_SERVER_CLIENT_ID=<Client_ID>
VITE_MYJOB_SERVER_CLIENT_SECRECT=<Client_Secret>
```

**Configuration steps:**

1. Access the Backend `Applications` page at: `https://ngrok-domain/o/applications/`
2. Click **`New Application`** button
3. Fill in information as follows:

   - **Name**: Choose any name (e.g., `Default authentication`)
   - **Client id**: Keep default value → Copy and update to `VITE_MYJOB_SERVER_CLIENT_ID`
   - **Client secret**: Keep default value → Copy and update to `VITE_MYJOB_SERVER_CLIENT_SECRECT`
   - **Hash client secret**: ✅ Check
   - **Client type**: Select `Confidential`
   - **Authorization grant type**: Select `Resource owner password-based`
   - Other fields can be left empty

   > ⚠️ **Important note**: Client id and Client secret must be **copied and saved** before clicking Save (cannot be viewed again after Save)

4. Click **`Save`**

---

#### 3.2. Login With Facebook

**Required environment variables:**

```env
VITE_FACEBOOK_CLIENT_ID=<Client_ID>
VITE_FACEBOOK_CLIENT_SECRET=<Client_Secret>
```

**Configuration steps:**

1. Access the Backend `Applications` page at: `https://ngrok-domain/o/applications/`
2. Click **`New Application`** button
3. Fill in information as follows:

   - **Name**: Choose any name (e.g., `Authenticate with Facebook`)
   - **Client id**: Paste the value of `SOCIAL_AUTH_FACEBOOK_KEY` that you configured in the Backend → Copy and update to `VITE_FACEBOOK_CLIENT_ID`
   - **Client secret**: Paste the value of `SOCIAL_AUTH_FACEBOOK_SECRET` that you configured in the Backend → Copy and update to `VITE_FACEBOOK_CLIENT_SECRET`
   - **Hash client secret**: ✅ Check
   - **Client type**: Select `Confidential`
   - **Authorization grant type**: Select `Client credentials`
   - Other fields can be left empty

   > ⚠️ **Important note**: Client id and Client secret must be **copied and saved** before clicking Save

4. Click **`Save`**

---

#### 3.3. Login With Google

**Required environment variables:**

```env
VITE_GOOGLE_CLIENT_ID=<Client_ID>
VITE_GOOGLE_CLIENT_SECRET=<Client_Secret>
```

**Configuration steps:**

1. Access the Backend `Applications` page at: `https://ngrok-domain/o/applications/`
2. Click **`New Application`** button
3. Fill in information as follows:

   - **Name**: Choose any name (e.g., `Authenticate with Google`)
   - **Client id**: Paste the value of `SOCIAL_AUTH_GOOGLE_OAUTH2_KEY` that you configured in the Backend → Copy and update to `VITE_GOOGLE_CLIENT_ID`
   - **Client secret**: Paste the value of `SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET` that you configured in the Backend → Copy and update to `VITE_GOOGLE_CLIENT_SECRET`
   - **Hash client secret**: ✅ Check
   - **Client type**: Select `Confidential`
   - **Authorization grant type**: Select `Client credentials`
   - Other fields can be left empty

   > ⚠️ **Important note**: Client id and Client secret must be **copied and saved** before clicking Save

4. Click **`Save`**

---

### 4. Dialogflow Chatbot

Configure chatbot for job seekers and employers.

**Required environment variables:**

```env
VITE_JOB_SEEKER_BOT_AGENT_ID=<Job_Seeker_Agent_ID>
VITE_EMPLOYER_BOT_AGENT_ID=<Employer_Agent_ID>
```

**Configuration steps:**

You need to create **2 chatbot agents**: one for job seekers and one for employers.

1. Access [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Click **`Create new agent`**
3. Fill in agent information:
   - Create first agent with name: `JobSeekerMyJobAgent` (for job seekers)
   - Create second agent with name: `EmployerMyJobAgent` (for employers)
   - You can choose a previously created Google Project or create a new one
4. After creating the agent, access **`Integrations`** → Select **`Dialogflow Messenger`** → Click **`ENABLE`**
5. The dialog displays the **agent-id**, copy and paste into:
   - `VITE_JOB_SEEKER_BOT_AGENT_ID` (for JobSeekerMyJobAgent)
   - `VITE_EMPLOYER_BOT_AGENT_ID` (for EmployerMyJobAgent)

> 💡 **Tip**: Repeat steps 2-5 for both agents

---

## 🗃️ Data Configuration

### 1. Configure Chatbot Data

**Purpose**: Import intents, entities and configure webhook so the chatbot can answer user questions.

**Steps to perform:**

1. Access [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Select agent `JobSeekerMyJobAgent` (or `EmployerMyJobAgent` to configure for employers)

3. **Configure Webhook** for chatbot to call Backend API:

   - Access **Fulfillment** → Enable **Enabled Webhook**
   - Enter information:
     - **URL**:
       - For job seekers: `https://ngrok-domain/api/chatbot/jobseeker/webhook/`
       - For employers: `https://ngrok-domain/api/chatbot/employer/webhook/`
     - **Basic Auth**:
       - Username: `temp`
       - Password: `temp`
   - Click **Save**

4. **Import agent data** from Backend:
   - Access **Settings** (gear icon) of the agent
   - Select **Export and Import** tab
   - Click **`IMPORT FROM ZIP`**
   - Select the corresponding file from the Backend `data/chatbot/` directory:
     - `JobSeekerMyJobAgent.zip` (for job seeker agent)
     - `EmployerMyJobAgent.zip` (for employer agent)
   - Wait for the import process to complete

> 💡 **Note**: Perform similarly for both agents (JobSeekerMyJobAgent and EmployerMyJobAgent)

---

### 2. Configure Images (Upload to Cloudinary)

**Purpose**: Automatically upload sample images to Cloudinary for display in the application.

**Steps to perform:**

1. Access the **Backend admin page** (Django Admin)
2. Go to **Periodic tasks** (Manage periodic tasks)
3. Find and select the record named:
   ```
   [SETUP] Upload Files To Cloudinary One-time Task: every 60 seconds
   ```
4. Check the **`Enabled`** box
5. Click **`Save`**
6. Wait **60 seconds** for the cron job to automatically run and upload images

> ⚠️ **Important note**:
>
> - This is a **one-time cron job** (one-time task)
> - The cron job will automatically upload all images from the `data/cloudinary/cloudinary_files.json` file (in Backend) to Cloudinary
> - **Do not shut down the Backend** while the cron job is running (at least 10 minutes)
> - After upload completes, you can disable this task

---

## 🎉 Complete!
