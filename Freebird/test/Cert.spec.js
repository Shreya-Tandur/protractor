var Url = require('./../Pagedata/L1/url.pd.json');
var LoginObjects = require('./../Pageobjects/loginobjects.po.js');
var CertificationModule = require('./../Pageobjects/certification.po.js');
var CertificationObject = require('./../Pagedata/Common/Certification.pd.json');

describe('Certification - ', function () {
    var certificationModule = new CertificationModule();

    browser.ignoreSynchronization = true;
    beforeAll(function () {
        browser.driver.manage().window().maximize();
        browser.get(Url.url);
        browser.sleep(20000);
        var loginObject = new LoginObjects();
        loginObject.username.sendKeys('29946');
        loginObject.password.sendKeys('29946');
        loginObject.bt.click();
        browser.sleep(20000);
    });
    var v = element.all(by.xpath('//div[@ng-repeat="toaster in toasters"]'));
    v.count().then(function (count) {
        console.log('count - ' + count);
        for (let index = 0; index < count; index++) {
            console.log('for loop - ' + index);
            element.all(by.xpath('//div[@ng-if="toaster.showCloseButton"]/button')).click();
            browser.sleep(900);
        }
    });

    it('Vallidate that certification screen is displayed when click on Certification link', function () {
        certificationModule.certification.click();
        certificationModule.certificationTitle.isDisplayed().then(function (res) {
            expect(res).toBe(true);
            browser.sleep(20000);
        });
    });

    it('validate that for the new user to take a test need to go to take a test link', function () {
        certificationModule.certificationstatus.isDisplayed().then(function () {
            certificationModule.takeAtest.click();
        })
    });

    it('Validate taketest page', function () {
        certificationModule.certificationTest.isPresent().then(function (res) {
            expect(res).toBe(true);
            if (res === true) {
                browser.sleep(20000);
                browser.wait(function () {
                    return element(by.xpath("//button[@ng-click='goToNextStep(2)']")).isPresent()
                });
                certificationModule.takeAtestButton.click();
            }
        })
    });

    it('validating step 3 in TakeAtest', function () {
        certificationModule.continue.isPresent().then(function () {
            certificationModule.continue.click();
        })
    });

    it('Validating welcome aboard page after click on TakeATest button', function () {
        certificationModule.welcomeAboardpage.isDisplayed().then(function (actualresult) {
            expect(actualresult).toBe(true);
            if (actualresult === true) {

            }
        })
    });

    it('Validate that Take a test is displayed for the 1st time', function () {
        certificationModule.takeAtest.isDisplayed().then(function (res) {
            if (res === true) {
                certificationModule.takeAtest.getText().then(function (actualResult) {
                    expect(actualResult).toEqual("Take a Test");
                });
            }
        });
    });

    it('Validate that criminal background check page is displayed on click of Take a Test ', function () {
        certificationModule.certificationpage.isDisplayed().then(function (res) {
            expect(res).toBe(true);
        })
    });

    it('Validate the 1st criminal question', function () {
        certificationModule.criminalQ1.isPresent().then(function (res) {
            expect(res).toEqual(true);
        })
    });

    it('Validate the qestion 1 is present and click on yes', function () {
        certificationModule.criminalQ1.getText().then(function (res) {
            expect(res).toEqual(CertificationObject.Question1.q1);
            if (res === CertificationObject.Question1.q1) {
                certificationModule.question1radiobuttonno.click();
            }
        })
    });

    it('validate the 2nd criminal question', function () {
        certificationModule.criminalQ2.isPresent().then(function (res) {
            expect(res).toBe(true);
        })
    });

    it('validate the question 2 is present and click on no', function () {
        certificationModule.criminalQ2.getText().then(function (res) {
            expect(res).toEqual(CertificationObject.Question2.q2);
            if (res === CertificationObject.Question2.q2) {
                certificationModule.question2radiobuttonno.click();
            }
        })
    });

    it('validate the 3rd question', function () {
        certificationModule.criminalQ3.isPresent().then(function (res) {
            expect(res).toBe(true);
        })
    });

    it('validate the question 3 is present and click on no', function () {
        certificationModule.criminalQ3.getText().then(function (res) {
            expect(res).toEqual(CertificationObject.Question3.q3);
            if (res === CertificationObject.Question3.q3) {
                certificationModule.question3radiobuttonno.click();
            }
        })
    });

    it('validate the caution msg', function () {
        certificationModule.caution.isPresent().then(function (res) {
            if (res === true) {
                expect(res).toBe(true);
            }
            else {
                fail('caution button is not present')
            }
        })
    });

    it('validating the submit button is present and if true click on submit button', function () {
        certificationModule.submit.isPresent().then(function (res) {
            certificationModule.submit.click();
        })
    });

    it('validating the crimecheck checkbox and cicking on it', function () {
        certificationModule.crimecheck_checkbox.isPresent().then(function (res) {
            certificationModule.CheckboxIcon.click();
        })
    });
});
