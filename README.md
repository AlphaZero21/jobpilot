# JobPilot (In the big 2026)

JobPilot is a full-stack application that helps you track, manage, and analyze your job applications in one place.
It combines a modern frontend with a scalable backend API and persistent database storage.

🌟 Features
📊 Dashboard
View all job applications in a clean interface
Sorted by most recent activity
Displays company, role, status, and notes
➕ Add Applications
Add new applications directly from the UI
Store:
company
job title
location
source (LinkedIn, Indeed, etc.)
resume used
notes
🔄 Status Tracking
Update application status instantly:
Applied
Interview
Offer
Rejected
📈 Summary Metrics
Total applications
Interviews
Offers
Rejections
🔌 API-Driven Architecture
Fully decoupled frontend and backend
REST API built with FastAPI
Interactive Swagger docs
## Current Project Status

This project is currently in **MVP stage**.

### Implemented

* Indeed job scraping
* Application tracking system (CSV-based)
* CLI commands for scraping, applying, and viewing stats
* Playwright-based assisted form filling

### In Progress / Planned

* Improved LinkedIn support (currently placeholder)
* Safer and more flexible batch apply workflows
* Better duplicate detection and validation
* Web-based dashboard for tracking applications
* Enhanced analytics and export features

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ArnaudViegas21/jobpilot.git
cd jobpilot
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Install Playwright browsers

```bash
playwright install
```

### 4. Configure your settings

```bash
python main.py config
```

Edit `config.yaml` with your details:

* Name, email, phone
* Resume path
* LinkedIn profile
* Job search preferences

---

## Usage

### 🔍 Scrape Jobs

```bash
python main.py scrape --keywords "Python Developer" --location "Remote" --source indeed --limit 20
```

---

### 📝 Apply to Jobs

```bash
python main.py apply --job-id indeed_abc123
```

Batch apply:

```bash
python main.py apply --batch --limit 5
```

> The browser will open and auto-fill forms. Manual review is required before submission.

---

### 📊 Track Applications

View all applications:

```bash
python main.py track list
```

Update status:

```bash
python main.py track update --job-id indeed_abc123 --status interview --notes "Phone screen scheduled"
```

View summary:

```bash
python main.py track summary
```

Detailed stats:

```bash
python main.py stats
```

---

## Project Structure

```
jobpilot/
├── applier/              # Browser automation (Playwright)
├── scraper/              # Job scraping modules
├── tracker/              # Application tracking logic
├── data/                 # Local/sample data storage
├── main.py               # CLI entry point
├── config.yaml           # User configuration
├── requirements.txt      # Dependencies
└── README.md
```

---

## Data Models

### Job

* id, title, company, location
* url, source, description
* salary, easy_apply

### Application

* job_id, status
* date_applied, date_updated
* notes, resume_used
* interview_date, offer_amount

---

## Important Notes

### LinkedIn Scraping

LinkedIn scraping is currently a placeholder. Production usage would require:

* official APIs
* authenticated browser automation
* or third-party services

---

### Auto-Apply Safety

Auto-submit is disabled by default. Always review applications before submitting.

---

### Rate Limiting

To avoid blocking:

* use delays between requests
* avoid aggressive scraping
* respect site policies

---

## Demo (Recommended to Add)

*Add screenshots here to improve usability and presentation*

```
assets/
  scrape-command.png
  tracker-list.png
  stats-summary.png
```

---

## Roadmap

* Support for additional job boards
* Chrome extension for saving jobs
* Web dashboard (React)
* Resume & cover letter templating
* Application analytics improvements

---

## License

MIT License

---

Built by [Arnaud Viegas](https://github.com/ArnaudViegas21)
