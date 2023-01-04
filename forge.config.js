module.exports = {
  packagerConfig: {
    icon: "./www/img/favicon.icns",
    name: "Gestionnaire de factures",
    platforms: ["darwin", "win32", "linux"]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', "win32", "linux"],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
