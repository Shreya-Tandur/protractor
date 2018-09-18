var logindata = require('./../Pagedata/Common/Logindata.pd.json');
var ErrorMessages = require('./../Pagedata/Common/errorMessages.pd.json');
var env = require('./../Pagedata/L1/url.pd.json');
var loginobject = require('./../Pageobjects/loginobjects.po.js');
var bannerObject = require('./../Pageobjects/banner.po.js');

browser.ignoreSynchronization = true;
describe('Login - ', function () {
    browser.driver.manage().window().maximize();
    var Loginobject = new loginobject();
    var BannerObject = new bannerObject();

    function loginToApp (user, pwd) {
        Loginobject.username.clear();
        Loginobject.username.sendKeys(user);
        Loginobject.password.clear()
        Loginobject.password.sendKeys(pwd);
        Loginobject.bt.click();
        browser.sleep(10000);
    }

    it('Validate that Freebird Self reservation system title is displayed when navigate to Freebird URl', function () {
        browser.get(env.url);
        browser.getTitle().then(function (actualResult) {
            expect(actualResult).toEqual('Freebird Self Reservation System');

        });
    });

    it('Validate that error message is displayed when enter invalid username and invalid password', function () {
        browser.sleep(10000);
        loginToApp(logindata.invalidCredentials.username, logindata.invalidCredentials.password);
        Loginobject.errorMsg.getText().then(function (actualResult) {
            expect(actualResult).toEqual(ErrorMessages.invalidCredentials.code + ':' + ErrorMessages.invalidCredentials.message);
        });
    });

    it('valid username, invalid password', function () {
        loginToApp(logindata.validCredentials.username, logindata.invalidCredentials.password);
        Loginobject.errorMsg.getText().then(function (res) {
            expect(res).toEqual(ErrorMessages.loginAttempts.code + ':' + ErrorMessages.loginAttempts.message);
        });
    });

    it('invalid username,valid password', function () {
        loginToApp(logindata.invalidCredentials.username, logindata.validCredentials.password)
        Loginobject.errorMsg.getText().then(function (res) {
            expect(res).toEqual(ErrorMessages.invalidCredentials.code + ':' + ErrorMessages.invalidCredentials.message);
        });
    });

    it('Validate that sign in button is disabled when value is entered only username field', function () {
        loginToApp(logindata.validCredentials.username, '')
        Loginobject.bt.isEnabled().then(function (res) {
            expect(res).toBe(false);
        })
    });

    it('Validate that sign in button is disabled when value is entered only password field', function () {
        loginToApp('', logindata.validCredentials.password)
        Loginobject.bt.isEnabled().then(function (res) {
            expect(res).toBe(false);
        })
    });

    it('validate without username and password', function () {
        loginToApp('', '')
        Loginobject.bt.isEnabled().then(function (res) {
            expect(res).toBe(false);
        })
    });


    it('valid credentials', function () {
        loginToApp(logindata.validCredentials.username, logindata.validCredentials.password);
        Loginobject.res.isDisplayed().then(function (res1) {
            expect(res1).toBe(true);
            var v = element.all(by.xpath('//div[@ng-repeat="toaster in toasters"]'));
            v.count().then(function (count) {
                for (let index = 0; index < count; index++) {
                    element.all(by.xpath('//div[@ng-if="toaster.showCloseButton"]/button')).click();
                    browser.sleep(900);
                }
            });
            Loginobject.usricon.click().then(function () {
                Loginobject.logoutfrompage.click();
            })
        });
    });


});
