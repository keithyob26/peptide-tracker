# Play Store Submission Checklist

## Before PWABuilder

- [ ] Privacy policy live at https://irishpeptides.ie/privacy-policy.html
- [ ] Log page confirmed working (diary, feel scores, weight, dose logging)
- [ ] Shop page shows Coming Soon
- [ ] assetlinks.json committed to peptide-tracker (placeholder SHA256)
- [ ] All disclaimers updated in app
- [ ] App meta: "PepTracker — Research Journal" in manifest and layout
- [ ] Instagram handle updated to @irishpeptides.ie in More page
- [ ] store-assets/ directory complete (icon, feature graphic, screenshots, descriptions)

## PWABuilder Steps (Keith does manually)

1. Go to https://pwabuilder.com
2. Enter: https://peptidetracker.irishpeptides.ie
3. Click Start → Android → Generate Package
4. Download the `.aab` file
5. Note the SHA256 fingerprint shown on the download screen
6. Update `public/.well-known/assetlinks.json` — replace `PLACEHOLDER_REPLACE_DURING_PWABUILDER` with the real SHA256 fingerprint
7. Commit and push the updated assetlinks.json
8. Wait for Cloudflare Pages to redeploy (1–2 min)
9. Verify: https://peptidetracker.irishpeptides.ie/.well-known/assetlinks.json returns real fingerprint

## Play Console Steps (Keith does manually)

1. Go to https://play.google.com/console
2. Pay $25 one-time developer registration fee
3. Create app:
   - App name: **PepTracker**
   - Default language: English (Ireland)
   - App or Game: App
   - Free or Paid: Free
4. Store listing:
   - Short description: paste contents of `store-assets/short-description.txt`
   - Full description: paste contents of `store-assets/full-description.txt`
   - Icon (512x512): upload `store-assets/icon-1024.png` (Play Console will accept 1024x1024)
   - Feature graphic (1024x500): upload `store-assets/feature-graphic.png`
   - Screenshots: upload `store-assets/screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png`
   - Privacy policy URL: `https://irishpeptides.ie/privacy-policy.html`
5. Content rating questionnaire:
   - See `store-assets/content-rating-notes.txt` for recommended answers
   - Target 18+ / Mature rating
6. App category: Health & Fitness
7. Country availability: Start with Ireland, expand after approval
8. Submit for review (typically 3–7 days for first submission)

## After PWABuilder Package Downloaded

- [ ] Replace SHA256 placeholder in assetlinks.json with real value
- [ ] Redeploy and verify assetlinks.json is live

## After Play Store Approval

- [ ] Verify TWA launches correctly (no browser bar visible)
- [ ] Add Play Store badge to irishpeptides.ie (coaching page, free-tools page)
- [ ] Add app download CTA to coaching page
- [ ] Update Notion Build Queue — mark Play Store submission complete
- [ ] Social post announcing app launch

## Notes

- PWABuilder generates a TWA (Trusted Web Activity) wrapping the live URL
- The assetlinks.json SHA256 must match the signing key used by PWABuilder
- If PWABuilder generates a new key each time: store the keystore file safely after first build
- Cloudflare Pages must serve the `.well-known/assetlinks.json` path without redirect
