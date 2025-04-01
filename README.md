# Cookie Injector

A Chrome extension for managing and manipulating browser cookies. Allows users to inject cookies and export/import cookies as files.

Chrome Web Store: [Cookie Injector](https://chrome.google.com/webstore/detail/cookie-injector/mflfghebbbnmdnkhbnmhajalhbgalklk?hl=zh-CN)

## Project Structure

```
cookieInjector/
├── manifest.json          # Extension configuration file
├── popup.html            # Main UI interface
├── popup.js              # Core functionality implementation
├── popup.css             # Styling for the popup interface
├── jquery-1.6.2.min.js   # jQuery library for DOM manipulation
├── icon.png              # Extension icon (16x16, 48x48, 128x128)
├── .gitattributes       # Git attributes configuration
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

## File Descriptions

- `manifest.json`: Defines the extension's metadata, permissions, and configuration
- `popup.html`: Contains the HTML structure for the extension's popup interface
- `popup.js`: Implements the core functionality including:
  - Cookie injection
  - Cookie listing
  - Domain/path filtering
  - Real-time search
- `popup.css`: Contains styles for the popup interface
- `jquery-1.6.2.min.js`: jQuery library for DOM manipulation and event handling
- `icon.png`: Extension icon used in Chrome browser and store
- `.gitattributes`: Git configuration for handling line endings and file attributes
- `.gitignore`: Specifies which files Git should ignore
- `README.md`: Project documentation and setup instructions

## Features

- View all cookies for current domain
- Inject new cookies with custom domain and path
- Filter cookies by domain and path
- Real-time cookie filtering
- Custom domain/path input support
- Export/import cookies as files

## Contact

i@caiyongji.com
