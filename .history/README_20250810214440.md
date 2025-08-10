# Nex AI - Multilingual AI Services Website

A modern, multilingual website for AI services including music production, video creation, application development, and more. Built with React and deployed on Netlify.

## 🌟 Features

- **Multi-language Support**: English, Dutch, French, German, Spanish
- **AI Services Showcase**: 5 different AI service offerings
- **Contact Form**: Progressive form with email integration
- **Responsive Design**: Works on all devices
- **Email Integration**: SendGrid integration for automated emails
- **Serverless Functions**: Netlify Functions for backend operations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- SendGrid account (for email functionality)
- Netlify account (for deployment)

### Installation

1. **Clone or download this project**
```bash
# If using git
git clone https://github.com/yourusername/nexai-website.git
cd nexai-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your SendGrid API key
```

4. **Start development server**
```bash
npm start
```

The site will open at `http://localhost:3000`

## 📁 Project Structure

```
nexai-website/
├── public/
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Site icon
├── src/
│   ├── App.js             # Main React component
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── netlify/
│   └── functions/
│       └── send-emails.js # Email sending function
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore rules
├── netlify.toml          # Netlify configuration
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind CSS config
└── postcss.config.js     # PostCSS config
```

## 🔧 Configuration

### SendGrid Setup

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Generate an API key with Mail Send permissions
3. Verify your sender email address
4. Add the API key to your `.env` file

### Environment Variables

Create a `.env` file in the root directory:

```env
SENDGRID_API_KEY=SG.your_actual_api_key
SENDGRID_VERIFIED_SENDER=hello@nexai.com
COMPANY_EMAIL=hello@nexai.com
```

## 🚀 Deployment to Netlify

### Method 1: GitHub Integration

1. Push your code to GitHub
2. Log in to Netlify
3. Click "New site from Git"
4. Connect your GitHub repository
5. Deploy settings will be auto-detected from `netlify.toml`
6. Add environment variables in Netlify dashboard
7. Deploy!

### Method 2: Direct Deploy

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod
```

### Method 3: Drag & Drop

1. Build the project
2. Drag the `build` folder to Netlify's deployment area

## 🔐 Environment Variables in Netlify

After deployment, add these in Netlify Dashboard → Site Settings → Environment Variables:

- `SENDGRID_API_KEY` - Your SendGrid API key
- `SENDGRID_VERIFIED_SENDER` - Your verified sender email
- `COMPANY_EMAIL` - Email to receive notifications

## 🌍 Language Support

The website supports 5 languages:
- 🇬🇧 English
- 🇳🇱 Dutch (Nederlands)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇪🇸 Spanish (Español)

Language preference is saved in localStorage.

## 📧 Email Features

The website sends two types of emails:
1. **Company Notification**: Sent to your team when someone books a consultation
2. **Client Confirmation**: Sent to the client with meeting details

## 🛠 Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `netlify dev` - Test with Netlify functions locally

### Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Icons**: Lucide React
- **Email**: SendGrid
- **Hosting**: Netlify
- **Functions**: Netlify Functions (AWS Lambda)

## 📝 Customization

### Changing Company Info
Edit the relevant sections in `src/App.js`:
- Company name
- Contact information
- Service descriptions
- Pricing

### Adding Languages
1. Add translations to the `translations` object in `App.js`
2. Add language to the `languages` array in the LanguageSelector component

### Styling
- Tailwind classes throughout components
- Global styles in `src/index.css`
- Tailwind config in `tailwind.config.js`

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Email Not Sending
1. Check SendGrid API key is correct
2. Verify sender email in SendGrid
3. Check Netlify function logs

### Styles Not Loading
1. Ensure Tailwind is installed
2. Check PostCSS configuration
3. Verify `index.css` imports

## 📊 Monitoring

- **Netlify Dashboard**: Monitor deployments and functions
- **SendGrid Dashboard**: Track email delivery
- **Analytics**: Add Google Analytics or similar

## 🤝 Support

For issues or questions:
- Check Netlify function logs
- Verify environment variables
- Test locally with `netlify dev`

## 📄 License

This project is available for use in your business.

## 🎯 Next Steps

1. Customize content for your business
2. Add your SendGrid API key
3. Deploy to Netlify
4. Configure custom domain
5. Test email functionality
6. Launch! 🚀

---

Built with ❤️ for Nex AI