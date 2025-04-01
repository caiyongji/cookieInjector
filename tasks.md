# Chrome Extension Migration Tasks: V2 to V3

## Overview
This document outlines the steps required to migrate the Cookie Injector extension from Chrome Extension Manifest V2 to V3. The migration is necessary as Chrome will phase out V2 support in 2024.

## 1. Update manifest.json
- [x] Change manifest_version from 2 to 3
- [x] Replace deprecated permissions:
  - [x] Remove `webRequest` and `webRequestBlocking`
  - [x] Add `declarativeNetRequest` for network request handling
  - [x] Add `declarativeNetRequestFeedback` if feedback is needed
- [x] Update host permissions:
  - [x] Move `http://*/*` and `https://*/*` from permissions to host_permissions
- [x] Update browser_action (no changes needed, but verify)
- [x] Add required fields:
  - [x] Add `action` (replaces browser_action in V3)
  - [x] Add `background` configuration if needed

## 2. Update Background Scripts
- [x] Convert background scripts to service workers:
  - [x] Create a new background.js file
  - [x] Move relevant background logic to service worker
  - [x] Update event listeners to use service worker context
- [x] Replace webRequest API with declarativeNetRequest:
  - [x] Define rules in rules.json
  - [x] Update manifest to include rules file
  - [x] Convert webRequest listeners to declarativeNetRequest rules

## 3. Update Cookie Management
- [x] Review and update cookie API usage:
  - [x] Verify chrome.cookies API calls are compatible
  - [x] Update any cookie manipulation code to use new APIs
- [x] Test cookie injection functionality
- [x] Test cookie export/import features

## 4. Update UI Components
- [x] Review popup.html:
  - [x] Update any deprecated HTML attributes
  - [x] Verify jQuery compatibility
- [x] Update popup.js:
  - [x] Replace any deprecated APIs
  - [x] Update event listeners to use modern syntax
  - [x] Test all UI interactions

## 5. Security Updates
- [ ] Implement Content Security Policy (CSP):
  - [ ] Add appropriate CSP in manifest
  - [ ] Update any inline scripts to external files
- [ ] Review and update permissions:
  - [ ] Remove unnecessary permissions
  - [ ] Add required host permissions
- [ ] Update any unsafe eval() or new Function() calls

## 6. Testing
- [ ] Test all features:
  - [ ] Cookie injection
  - [ ] Cookie listing
  - [ ] Domain/path filtering
  - [ ] Real-time search
  - [ ] Export/import functionality
- [ ] Cross-browser testing:
  - [ ] Test in Chrome
  - [ ] Test in Edge (if targeting)
- [ ] Performance testing:
  - [ ] Verify service worker performance
  - [ ] Check memory usage

## 7. Documentation
- [ ] Update README.md:
  - [ ] Add V3-specific information
  - [ ] Update installation instructions
  - [ ] Update feature documentation
- [ ] Update any inline code comments
- [ ] Document any breaking changes

## 8. Deployment
- [ ] Update version number in manifest.json
- [ ] Test in Chrome Web Store:
  - [ ] Verify all features work
  - [ ] Check for any warnings
- [ ] Prepare update submission

## Notes
- Keep V2 version in a separate branch for reference
- Test thoroughly in development environment
- Monitor Chrome Web Store feedback after update
- Consider implementing feature flags for gradual rollout

## Resources
- [Chrome Extension Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Extension Manifest V3 Overview](https://developer.chrome.com/docs/extensions/mv3/overview/)
- [Chrome Extension Manifest V3 API Reference](https://developer.chrome.com/docs/extensions/reference/) 