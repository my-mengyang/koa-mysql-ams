const fs = require('fs');


const useRoutes = function() {
  fs.readdirSync(__dirname).forEach(file => {
    console.log(file)
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    console.log(router)
    this.use(router.routes());
    this.use(router.allowedMethods());
  })
}

module.exports = useRoutes;