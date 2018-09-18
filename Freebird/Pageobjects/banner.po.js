var banner = function () {
  this.banner = element.all(by.xpath('//div[@ng-repeat="toaster in toasters"]'));
  this.bannertxt = element.all(by.xpath('//div[@ng-bind-html="toaster.html"]'));
  this.closeBanner = element.all(by.xpath('//div[@ng-if="toaster.showCloseButton"]/button'));

  this.allBannersRemoval = function () {
    this.banner.isPresent().then(function (res) {
      console.log('res - ' + res);
      if (res === true) {
        console.log('inside if');
        // this.closeBanner.first().click();
        // this.banner.count().then(function (count1) {
        //   console.log('count - ' + count1);
        //   for (let index = 0; index < count1; index++) {
        //     this.closeBanner.first().click();
        //   }
        // });
        this.bannertxt.count().then(function (count1) {
          console.log('count - ' + count1);
          for (var index = 0; index < count1; index++) {
            this.closeBanner.first().click();
            browser.sleep(20000);
          }
        });
      }
    });
  }
};

module.exports = banner;
