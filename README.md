# Founder Freedom Pattern™

A premium strategic diagnostic assessment for mid-career professionals considering the transition from corporate life to entrepreneurship. Built for **Thriving Founder™**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/assessment`.

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SHEETS_WEBHOOK_URL` | Google Apps Script webhook URL for form submissions | No (submissions queue locally) |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly scheduling page URL for strategy call modal | No (shows placeholder) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | No |

## Google Apps Script Integration

1. Create a Google Sheet for submissions
2. Go to **Extensions → Apps Script**
3. Create a `doPost(e)` function that parses JSON and appends to your sheet:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.resultId,
    data.timestamp,
    data.firstName,
    data.email,
    data.totalPercent,
    data.lowestBarrier,
    data.tier,
    JSON.stringify(data.qualificationAnswers),
    JSON.stringify(data.foundationScores),
  ]);
  return ContentService.createTextOutput('OK');
}
```

4. Deploy as Web App (Execute as: Me, Access: Anyone)
5. Copy the URL to `NEXT_PUBLIC_SHEETS_WEBHOOK_URL`

## Email Integration

Email delivery is modeled but not implemented. To wire up:

- **Resend** (recommended): See `lib/assessment/services/email.ts` for the interface
- **SendGrid**: Same interface, swap the provider
- **Serverless**: Create an API route at `/api/send-report` that accepts the result object

The email template should use fields from `AssessmentResult`: firstName, scoring, tier, lowestBarrier, and resultId (for a link back to results).

## Calendly

Set `NEXT_PUBLIC_CALENDLY_URL` to your Calendly scheduling page. The modal on the results page embeds it in an iframe. If not configured, a placeholder is shown.

## Extending with a Landing Page

The app currently assumes users arrive directly at `/assessment`. To add a public landing page:

1. Replace `app/page.tsx` (currently redirects to `/assessment`) with your landing page
2. The assessment flow at `/assessment` remains unchanged
3. Add any marketing routes as siblings in the `/app` directory

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Recharts (radar chart)
- Framer Motion (transitions)
- Zod (validation)
- nanoid (result IDs)

## Project Structure

```
app/
  assessment/          → Assessment flow routes
  results/[resultId]/  → Shareable results page
components/            → Reusable UI components
lib/assessment/
  content/             → Question copy and metadata
  engine/              → Scoring, segmentation, validation
  services/            → Analytics, submission, persistence, email
  context.tsx          → React context + reducer
  types.ts             → TypeScript interfaces
  constants.ts         → Configuration constants
```
