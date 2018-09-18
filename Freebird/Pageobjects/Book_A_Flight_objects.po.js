var bookaflight = function () {
    //Book_A_Flight page elements
    this.WaitForPageToLoad = function () {
        browser.sleep(20000);
    };
    this.expectcondition = function () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.xpath('//span[text()=\'Outbound Flights\']')), 5000));
    };
    this.outboundFlights = element(by.xpath('//span[text()=\'Outbound Flights\']'));
    this.username = element(by.id('username'));
    this.password = element(by.id('password'));
    this.signin = element(by.xpath('//button[text()=\'Sign in\']'));
    this.text = element(by.xpath('//span[text()=\'Flight\']'));
    this.search_by_route = element(by.id('searchByRoute'));
    this.search_by_flight = element(by.id('searchByFlight'));
    this.searchFlight = element(by.xpath('//button[text()=\' Search Flight \']'));
    this.one_way = element(by.id('radioOneWay'));
    this.non_stop = element(by.id('radioNonStop'));
    this.roundTripLabel = element(by.xpath('//span[@ng-click="vm.toggleRoundTrip(true)"]/label'));
    this.roundTrip = element(by.xpath('(//input[@ng-model="vm.flightSearchParams.isRoundTrip"])[2]'));
    this.multistop = element(by.xpath('(//input[@ng-model="vm.flightSearchParams.isNonStop"])[2]'));
    this.multistopLabel = element(by.xpath('//span[@ng-click="vm.toggleNonStop(false)"]/label'));
    this.reset = element(by.xpath('//span[text()=\' Reset \']'));
    this.Local = element(by.xpath('//input[@id=\'timezone\']//following-sibling::label[@class=\'onoffswitch-label\']'));
    this.origin = element(by.id('origin'));
    this.destination = element(by.id('destination'));
    this.outbound = element(by.xpath('//span[text()=\'Outbound Flights\']'));
    this.errormessage1 = element(by.xpath('//small[@class="text-danger"]'));
    this.roundtrip = element(by.xpath('//input[@id=\'radioRoundTrip\']'));
    this.originNearByRamp = element(by.xpath('//input[@ng-model=\'vm.flightSearchParams.origin.useAltRamps\']'));
    this.originNearbyRampNotEmpty = element(by.xpath(''))
    this.DestNearByRamp = element(by.xpath('//input[@ng-model=\'vm.flightSearchParams.destination.useAltRamps\']'));
    this.timezone = element(by.id('timezone'));
    this.FlightNumber = element.all(by.xpath('//tr[@ng-repeat-start=\'flightArr in vm.flightSearchResults.onwardFlights\']/td[1]/span[1]'));
    this.departuredate = '//div[@ng-click="vm.openDatePicker(\'departureDate\')"]';
    this.startDateTriggerElement = '//button[@ng-click=\'vm.popup1.opened = true\']';
    this.endDateTriggerElement = '//button[@ng-click="vm.popup2.opened = true"]'

    //reservation page : flight details
    this.bookedFlightSuccessfully = element(by.xpath('//b[contains(text(),\'Booked Flight Successfully\')]'));
    this.confirmbutton = element(by.xpath('//span[contains(text(),\'Confirm Booking\')]'));
    this.travelSatusDropdown = element(by.tagName('option'));
    this.TSoption1 = element(by.xpath('//select[@ng-model=\'vm.details.onwardFlightDetails.travelStatus\']/option[2]'))
    this.travelStatus = element(by.xpath('//select[@ng-model=\'vm.details.onwardFlightDetails.travelStatus\']'));
    this.outboundFlightNumber = element.all(by.xpath('//tr[@ng-repeat-start="flightArr in vm.flightSearchResults.onwardFlights"]/td[1]/span[1]'));
    this.outboundFlightAircraftType = element.all(by.xpath('//tr[@ng-repeat-start="flightArr in vm.flightSearchResults.onwardFlights"]/td[1]/span[2]'));
    this.outboundFlightSourceAndDestination = element.all(by.xpath('//tr[@ng-repeat-start="flightArr in vm.flightSearchResults.onwardFlights"]/td[2]'));
    this.outboundFlightDepartureTime = element.all(by.xpath('//tr[@ng-repeat-start="flightArr in vm.flightSearchResults.onwardFlights"]/td[4]/span/span'));
    this.outboundFlightArrivalTime = element.all(by.xpath('//tr[@ng-repeat-start="flightArr in vm.flightSearchResults.onwardFlights"]/td[4]/span'));
    this.outboundFlightShow = element.all(by.xpath('//tr[@ng-repeat-start="flightArr in vm.flightSearchResults.onwardFlights"]/td[3]'));
    this.outboundFlightSeatAvailability = element.all(by.xpath('//tr[@ng-repeat-start="flightArr in vm.flightSearchResults.onwardFlights"]/td[5]/span[1]'));
    this.confirmBookingFlightnumber = element(by.xpath('//div[@ng-if=\'vm.lastBookedReservation.onwardFlight\']/div[3]/div/div/div/div[1]/span[1]'));
    this.confirmBookingOrgDest = element(by.xpath('//div[@ng-if=\'vm.lastBookedReservation.onwardFlight\']/div[3]/div/div/div/div[2]'));
    this.confirmBookingDepArriv = element(by.xpath('//div[@ng-if=\'vm.lastBookedReservation.onwardFlight\']/div[3]/div/div/div/div[3]'));
    this.confirmBookingShow = element(by.xpath('//div[@ng-if=\'vm.lastBookedReservation.onwardFlight\']/div[3]/div/div/div/div[4]'));
    this.confirmBookingDuration = element(by.xpath('//div[@ng-if=\'vm.lastBookedReservation.onwardFlight\']/div[3]/div/div/div/div[5]'));
    this.myReservationTab = element(by.xpath('//a[@ng-repeat=\'item in sidebar.sidebarToShow.navItems\'][2]/li'));
    this.viewList = element(by.xpath('//span[contains(text(),\'View List\')]'));
};
module.exports = bookaflight;