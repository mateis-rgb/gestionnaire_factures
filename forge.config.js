module.exports = {
  packagerConfig: {
    icon: "./www/img/favicon.icns",
    name: "Gestionnaire de factures",
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platform: ["darwin"]
    }
  ],
};
