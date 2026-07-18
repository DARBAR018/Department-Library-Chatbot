# Question Papers & E-Books PDF Directory

This folder is designed to house physical PDF assets if the project is connected to static hosts or Firebase Storage.

In our current **Demo Mode / Unified Local Storage Mode**, the portal dynamically compiles mock PDF sheets on-the-fly inside the browser during download. This ensures:
1. Zero broken links or 404 file-not-found errors.
2. Immediate download availability for testing the system.
3. No bloated asset folders.

To use real files, configure Firebase Storage in `js/config.js` and upload files using the Admin Panel.
