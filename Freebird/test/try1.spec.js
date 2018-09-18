//spec
describe('', function () {
    var origin = element(by.xpath("//input[@ng-model='vm.flightSearchParams.origin.name']"));
    var destination = element(by.xpath("//input[@ng-model='vm.flightSearchParams.destination.name']"));
    var searchFlight = element(by.xpath("//button[contains(text(),'Search Flight')]"));
    var username = element(by.xpath("//input[contains(@placeholder,'Username')]"));
    var password = element(by.xpath("//input[contains(@placeholder,'Password')]"));
    var signin = element(by.xpath("//button[@type='submit']"));

    function add (org, dest) {
        origin.sendKeys(org);
        destination.sendKeys(dest);
    }

    function waitforpagetoload () {
        // var EC = protrctor.ExpectedConditions;
        // browser.wait(EC.visibilityOf($('#abc')), 5000);
        browser.sleep(20000);
    }

    it('open the browser', function () {
        browser.get('http://jumpseat-l1-01.test.cloud.fedex.com:7001/jumpseat');
        browser.driver.manage().window().maximize();
        waitforpagetoload();
        username.sendKeys('43731');
        password.sendKeys('43731');
        signin.click();
        waitforpagetoload();
    })

    it('Enter origin and destination in the respective feilds and hit searchflight', function () {
        waitforpagetoload();
        add(MEM, LAX);
        searchFlight.click();
    })

})

