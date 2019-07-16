module.exports = {
  publicPath: '/public',
  outputDir: 'dist',
  assetsDir: 'assets',
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: true,
  css: {
    modules: false,
    extract: true,
    sourceMap: true,
  },
  lintOnSave: true,
    pages: {
        signin: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/signin.html',
          title: 'Sign in',
        },
        signup: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/signup.html',
          title: 'Sign up',
        },
        signupconfirm: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/signupconfirm.html',
          title: 'Sign up Confirm',
        },
        signout: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/signout.html',
          title: 'Sign out',
        },
        menu: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/menu.html',
          title: 'Menu',
        },
        rentalbook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/rentalbook.html',
          title: 'Rental Book',
        },
        maintebook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/maintebook.html',
          title: 'Maintenance Book',
        },
        sorry: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/sorry.html',
          title: 'Sorry',
        },
    },
};
