# StudentOS Hybrid Prototype

StudentOS is a student-centric mobile app prototype built as a lightweight PWA-style hybrid app. It can run directly in a browser today and can be wrapped later with Capacitor, Ionic, or another WebView shell for Android and iOS.

## Screens Included

- Lock screen
- Home dashboard
- Study mode
- Class chat
- Emergency SOS

## Run Locally

```bash
node server.js
```

Open `http://127.0.0.1:4173`.

To test on an iPhone connected to the same Wi-Fi as this Mac, run the server and open the Mac's local network URL in Safari, for example:

```text
http://192.0.0.1:4173
```

Then tap Share and choose **Add to Home Screen**. iOS will install StudentOS as a home-screen web app using the included app icon and manifest.

## iPhone Executable Note

iOS does not allow installing an unsigned executable file. A native `.ipa` requires full Xcode plus an Apple signing certificate and provisioning profile. Once Xcode signing is available, use the Capacitor path below to create the iOS wrapper and archive a signed `.ipa`.

## Hybrid Packaging Path

This version is dependency-free so the initial screens are easy to review. For Android and iOS packaging, add Capacitor later and point it at this web app:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init StudentOS com.studentos.app --web-dir .
npx cap add android
npx cap add ios
```

The current UI is already structured as mobile-first screens, so those wrappers can reuse the same `index.html`, `styles.css`, and `app.js`.
