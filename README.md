# MealYou

A groceries generator mobile app used to simplify doing groceries and limit waste.

## Install Node / NPM

Check this tutorial from [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04#option-2-installing-node-js-with-apt-using-a-nodesource-ppa).

Command summarize:
```bash
curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh | bash
sudo apt install nodejs

node -v
npm -v
```
Recommended version to run/build the project:
* **node**: v18.20.2
* **npm**: 10.5.0

## Install Android Studio on Ubuntu

Follow [this guide](https://medium.com/@duaaawan/how-to-install-update-android-studio-jellyfish-easy-guide-for-beginners-704671cb5e3a)

**Version installed**: Android-Studio Jellyfish 

## Install dependencies

Install necessary command using npm:
```bash
npm install
```

## Usefull Ionic commands

### Start web server
```bash
npx ionic serve
```

### Build web server source code
```bash
npx ionic build
```

## Build Android project for Android Studio
```bash
# Should open automatically Android-Studio when build finishes
npx ionic capacitor build android
```

## Open Android project with Android Studio
```bash
npx ionic capacitor open android
```

### Build APK file

Follow [this guide](https://ionic.io/blog/building-and-releasing-your-capacitor-android-app).
