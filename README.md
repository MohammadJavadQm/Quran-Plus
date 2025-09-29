🕌 Quran-Plus: Advanced Quran Reader & Study App

📖 Project Overview
Quran-Plus is a modern, feature-rich web application designed to enhance the experience of reading, studying, and reflecting on the Holy Quran. Built with cutting-edge web technologies, it provides an intuitive interface for users to explore the Quran in multiple languages, listen to recitations, search verses, and track their progress in memorization and tafseer (exegesis).
This project aims to make the Quran accessible to everyone, combining traditional reverence with contemporary usability. Whether you're a daily reader, student, or researcher, Quran-Plus offers tools to deepen your connection with the divine text.
Key Highlights

Multi-Language Support: Arabic, English, Persian, Urdu, and more.
Audio Integration: High-quality recitations from renowned Qaris.
Offline Capabilities: Download surahs for offline reading.
Study Tools: Bookmarks, notes, tafseer, and progress tracking.
Responsive Design: Works seamlessly on desktop, tablet, and mobile.

✨ Features
Core Features

Verse Navigation: Jump to any surah, juz, or ayah with one click.
Search & Filter: Advanced search by keywords, topics, or Arabic roots.
Translations & Tafseer: Multiple translations (e.g., Sahih International, Pickthall) and tafseer (e.g., Ibn Kathir).
Audio Player: Play, pause, repeat, and speed control for recitations.
Night Mode: Eye-friendly dark theme for late-night reading.

Advanced Features

Memorization Tracker: Set goals, quiz yourself, and track hifz progress.
Social Sharing: Share verses via social media or export to PDF.
Custom Playlists: Create playlists of favorite surahs or themes.
API Integration: Fetches real-time data from Quran APIs (e.g., Al-Quran Cloud).
Accessibility: Screen reader support and high-contrast modes.

Future Roadmap

Mobile app (React Native).
AI-powered verse recommendations.
Community forums for discussions.
Integration with prayer times APIs.

📱 Screenshots



Home Dashboard
Surah View
Search Results








(Add actual screenshots to the screenshots/ folder for better visualization.)
🛠️ Tech Stack



Category
Technologies



Frontend
React.js, TypeScript, Tailwind CSS, Framer Motion


Backend
Node.js, Express.js (for custom APIs)


Database
SQLite (local storage), PostgreSQL (future cloud sync)


APIs
Al-Quran Cloud API, Quran.com API


Build Tools
Vite, ESLint, Prettier


Testing
Jest, React Testing Library


Deployment
Vercel, Netlify


📂 Project Structure
Quran-Plus/
│
├── public/                 # Static assets (icons, audio files)
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── VerseCard.tsx
│   │   └── AudioPlayer.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Surah.tsx
│   │   └── Search.tsx
│   ├── services/           # API services and utils
│   │   ├── quranApi.ts
│   │   └── audioService.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useVerses.ts
│   │   └── useAudio.ts
│   ├── styles/             # Global styles and themes
│   └── utils/              # Helper functions
│
├── tests/                  # Unit and integration tests
├── docs/                   # Documentation
│   └── API.md
├── screenshots/            # Screenshots for README
│
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

🚀 Getting Started
Prerequisites

Node.js (v18 or higher)
Yarn or npm package manager
A modern web browser (Chrome, Firefox, Safari)

Installation

Clone the Repository
git clone https://github.com/MohammadJavadQm/Quran-Plus.git
cd Quran-Plus


Install Dependencies
yarn install
# or
npm install


Environment SetupCreate a .env file in the root directory:
REACT_APP_QURAN_API_URL=https://api.alquran.cloud/v1
REACT_APP_AUDIO_BASE_URL=https://audio.quran.com


Run the Development Server
yarn dev
# or
npm run dev

Open http://localhost:5173 in your browser.


Build for Production
yarn build
# or
npm run build

The production build will be in the dist/ folder. Deploy to Vercel or Netlify.
📖 Usage
Basic Navigation

Home Page: Dashboard with quick links to Juz 30, favorites, and daily verse.
Surah View: Select a surah from the dropdown, navigate ayahs with arrows.
Search: Enter keywords like "mercy" to find relevant verses.

Example: Listening to a Recitation

Go to Surah Al-Fatiha.
Click the play button next to the ayah.
Use the audio controls to adjust speed or loop.

Offline Mode

Download surahs via the settings menu.
Data is stored in IndexedDB for offline access.

🧪 Testing
Run tests with:
yarn test
# or
npm test

Coverage report:
yarn test:coverage

🔧 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a feature branch: git checkout -b feature/amazing-feature.
Commit changes: git commit -m 'Add amazing feature'.
Push to the branch: git push origin feature/amazing-feature.
Open a Pull Request.

Code Style

Use ESLint for linting: yarn lint.
Format with Prettier: yarn format.

See CONTRIBUTING.md for detailed guidelines.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🛡️ Security
If you discover a security vulnerability, please report it via email to mohammadjavad.m@gmail.com rather than opening an issue.
📞 Contact
Mohammad Javad Qm  

Email: mohammadjavad.m@gmail.com  
GitHub: MohammadJavadQm  
LinkedIn: mohammad-javad-qm  
Website: quran-plus.com (coming soon)

Acknowledgments

Thanks to the Quran API providers for free access to sacred data.
Inspired by open-source Quran projects like Quran.js and Tanzil.


⭐ Star this repository if you find it useful!🙏 JazakAllah Khair for your interest in Quran-Plus.
