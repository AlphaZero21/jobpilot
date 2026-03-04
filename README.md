# JobPilot 🚀

> A comprehensive job application tracker and auto-applier built with Python.

JobPilot helps you manage your job search by scraping listings from job boards, tracking your applications, and automating the application process using browser automation.

## Features

✅ **Job Scraping** - Automatically scrape jobs from Indeed and LinkedIn  
✅ **Application Tracking** - Track status, dates, and notes for all applications  
✅ **Auto-Apply** - Use Playwright to auto-fill application forms  
✅ **CLI Interface** - Easy-to-use command line interface with Rich formatting  
✅ **Statistics** - View your application success rates and trends  

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/AlphaZero21/jobpilot.git
cd jobpilot
```

### 2. Install Python dependencies
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

Edit `config.yaml` with your personal information:
- Name, email, phone
- Resume path
- LinkedIn profile
- Search preferences

## Usage

### 🔍 Scrape Jobs

Search for jobs on Indeed:
```bash
python main.py scrape --keywords "Python Developer" --location "Remote" --source indeed --limit 20
```

Search on LinkedIn (requires setup):
```bash
python main.py scrape --keywords "Software Engineer" --location "San Francisco" --source linkedin
```

### 📝 Apply to Jobs

Apply to a specific job:
```bash
python main.py apply --job-id indeed_abc123
```

Batch apply to multiple jobs:
```bash
python main.py apply --batch --limit 5
```

**Note:** The browser will open and auto-fill forms, but you must review and submit manually by default (for safety).

### 📊 Track Applications

View all your applications:
```bash
python main.py track list
```

See statistics summary:
```bash
python main.py track summary
```

Update an application status:
```bash
python main.py track update --job-id indeed_abc123 --status interview --notes "Phone screen scheduled for Friday"
```

Get detailed stats:
```bash
python main.py stats
```

## Project Structure

```
jobpilot/
├── data/                      # Your data (gitignored)
│   ├── jobs.json             # Scraped job listings
│   ├── applications.csv      # Your application tracker
│   └── resume.pdf            # Your resume
├── scraper/                   # Job scrapers
│   ├── base.py               # Base scraper class
│   ├── indeed.py             # Indeed scraper
│   └── linkedin.py           # LinkedIn scraper
├── tracker/                   # Application tracking
│   ├── models.py             # Data models (Job, Application)
│   └── tracker.py            # CRUD operations
├── applier/                   # Auto-application
│   ├── applier.py            # Main orchestrator
│   └── form_filler.py        # Playwright form automation
├── main.py                    # CLI entry point
├── config.yaml               # Your settings
└── requirements.txt          # Dependencies
```

## Data Models

### Job
Represents a scraped job listing:
- `id` - Unique identifier
- `title` - Job title
- `company` - Company name
- `location` - Location
- `url` - Link to posting
- `source` - Job board (indeed, linkedin)
- `description` - Full description
- `salary` - Salary range
- `easy_apply` - Has one-click apply?

### Application
Represents a submitted application:
- `job_id` - Links to Job
- `status` - new, applied, interview, offer, rejected, withdrawn
- `date_applied` - When you applied
- `date_updated` - Last status change
- `resume_used` - Resume version
- `notes` - Your notes
- `interview_date` - If scheduled
- `offer_amount` - If received

## Important Notes

### LinkedIn Scraping
LinkedIn actively blocks web scrapers. The LinkedIn scraper is currently a placeholder. For production use:
1. Use LinkedIn's official API (requires approval)
2. Use a paid service like RapidAPI
3. Implement Playwright with proper authentication and CAPTCHA handling

### Indeed Scraping
Indeed's HTML structure changes frequently. If the scraper stops working:
1. Inspect the page with browser DevTools
2. Update the CSS selectors in `scraper/indeed.py`
3. Consider rate limiting (add delays between requests)

### Auto-Apply Safety
**NEVER** enable `auto_submit: true` in config without thoroughly testing. Always review applications before submitting. The default behavior pauses for you to review.

### Rate Limiting
Job boards will block you if you scrape too aggressively. The scraper includes:
- Random delays between requests
- Retry logic with exponential backoff
- User agent rotation

If you get blocked, wait 24 hours and reduce your request frequency.

## Advanced Usage

### Running Individual Modules

Test the scraper:
```bash
python scraper/indeed.py
```

Test the form filler:
```bash
python applier/form_filler.py
```

Test the tracker:
```bash
python tracker/tracker.py
```

### Custom Resume Data

Edit `data/resume.json` with structured data for more sophisticated auto-filling:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0100",
  "experience": [
    {
      "title": "Senior Developer",
      "company": "Tech Corp",
      "duration": "2020-2023"
    }
  ],
  "skills": ["Python", "JavaScript", "Docker"]
}
```

## Troubleshooting

### Playwright Errors
```bash
# Reinstall browsers
playwright install --force
```

### CSV Encoding Issues
If you see weird characters in `applications.csv`, ensure it's saved as UTF-8 in your editor.

### Module Import Errors
Make sure you're running commands from the project root:
```bash
cd jobpilot
python main.py scrape ...
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Legal & Ethics

⚠️ **Important:**
- Review each job board's Terms of Service before scraping
- Respect rate limits and robots.txt
- Don't use this to spam applications
- Always review applications before submitting
- Use responsibly and ethically

## License

MIT License - See LICENSE file for details

## Roadmap

- [ ] Support for more job boards (Glassdoor, Monster)
- [ ] Chrome extension for one-click tracking
- [ ] Email notifications for status changes
- [ ] Resume/cover letter templating
- [ ] Interview scheduling integration
- [ ] Analytics dashboard
- [ ] Mobile app

## Support

Found a bug? Have a feature request? Open an issue on GitHub!

---

Made with ❤️ by [AlphaZero21](https://github.com/AlphaZero21)