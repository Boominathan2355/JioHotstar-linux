# JioHotstar Linux

A premium, feature-rich Microsoft Teams wrapper for Linux built with Electron. This application provides a native-like experience for JioHotstar on Linux desktops.

## Features

- **Premium UI**: Custom CSS injection for a sleek, dark theme with backdrop filters and smooth transitions.
- **Window State Persistence**: Remembers your window size and position across sessions.
- **System Tray Integration**: Minimize the app to the tray for a clutter-free workspace.
- **Native Context Menus**: Right-click support for common actions.
- **Secure Navigation**: Opens external links in your default browser.
- **Custom Scrollbars**: Modern, thin scrollbars that match the application's aesthetic.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/bn/JioHotstar-linux.git
   cd JioHotstar-linux
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

## Build & Packaging

To build the application for distribution (AppImage, deb):

```bash
npm run dist
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
