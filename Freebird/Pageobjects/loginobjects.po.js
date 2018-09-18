var Reservation = function () {
    //Login page objects
    this.username = element(by.id("username"));
    this.password = element(by.id("password"));
    this.bt = element(by.buttonText("Sign in"));
    this.var = element(by.linkText('Flight'));
    this.errorMsg = element(by.xpath('//span[@ng-bind="authenticationErrorMessage"]'));
    this.logout = element(by.xpath('//a[contains(text(),\'Logout\')]'));
    this.res = element(by.xpath('//span[contains(text(),\'Catherine Sachse\')]'));
    this.usricon = element(by.xpath('//img[@class=\'user-icon\']'));
    this.logoutfrompage = element(by.xpath('//a[@id=\'simple-dropdown\']/following-sibling::ul//a[text()=\'Logout\']'));

    //Banner page objects
    this.closebanner = element(by.xpath('//div[@ng-if="toaster.showCloseButton"]/button'));
    this.bannertxt = element(by.xpath('//div[@ng-bind-html="toaster.html"]'));
    this.banner = element(by.xpath('//div[@ng-repeat="toaster in toasters"]'));

};
module.exports = Reservation;