var datepicker = require('./../Pageobjects/dtPickerForMaintenance.po.js');
var Book_a_flight_object = require('./../Pageobjects/Book_A_Flight_objects.po');
var book_a_flight_data = require('./../Pagedata/Common/Book_A_Flightdata.pd.json');
var u = require('./../Pagedata/L1/url.pd.json');
var errormessage = require('./../Pagedata/Common/errorMessages.pd.json')
var commonobjects = require('./../Pageobjects/CommonObjects.po')
var reservation = require('./../Pageobjects/Reservation.po')

browser.ignoreSynchronization = true;
describe('Book a flight', function () {
    var book_a_flight_object = new Book_a_flight_object();
    var Commonobjects = new commonobjects();
    var Reservation = new reservation();
    browser.driver.manage().window().maximize();
    browser.get(u.url);
    browser.ignoreSynchronization = true;
    browser.sleep(20000);
    book_a_flight_object.username.sendKeys('43731');
    book_a_flight_object.password.sendKeys('43731');
    book_a_flight_object.signin.click();
    browser.sleep(10000);

    var v = element.all(by.xpath('//div[@ng-repeat="toaster in toasters"]'));
    v.count().then(function (count) {
        for (let index = 0; index < count; index++) {
            console.log('for loop - ' + index);
            element.all(by.xpath('//div[@ng-if="toaster.showCloseButton"]/button')).click();
            browser.sleep(900);
        }
    });

    function selectValueInSuggestionWindow (j, total, cityCode, cityName) {
        return Commonobjects.suggestions.get(j).getText().then(function (txt) {
            var val = txt.split(' - ');
            if (val[0] === cityCode || val[1] === cityName) {
                return j;
            }
            return selectValueInSuggestionWindow(++j, total, cityCode, cityName);
        });
    };

    function suggestionsWindow (cityCode, cityName) {
        return Commonobjects.suggestions.count().then(function (totalSuggestions) {
            return selectValueInSuggestionWindow(0, totalSuggestions, cityCode, cityName).then(function (res) {
                return res;
            });
        });
    }

    var setValue = function (ele, value) {
        ele.clear();
        ele.sendKeys(value);
        browser.sleep(2000);
    };

    it('Validating the home page', function () {
        book_a_flight_object.text.getText().then(function (r) {
            expect(r).toEqual('Flight');

        });
    });

    xit('validate the radio buttons (roundtrip) when origin/dest not specified', function () {
        book_a_flight_object.roundTrip.getAttribute('disabled').then(function (res) {
            // console.log('work res - ' + res);
            var r = res.toString();
            if (r === 'true') {
                expect(res).toBe('true');
            }
            else {
                console.log('roundtrip radio button is enabled when no Origin/destination specified on Reservation screen');
            }
        })
        book_a_flight_object.multistop.getAttribute('disabled').then(function (res1) {
            var r1 = res1.toString();
            if (r1 === 'true') {
                expect(res1).toBe('true');
            }
            else {
                console.log('multistop radio button is enabled when no Origin/destination specified on Reservation screen');
            }
        })

    });

    xit('Validate when origin/destination not specified', function () {
        book_a_flight_object.search_by_route.click();
        browser.sleep(10000);
        setValue(book_a_flight_object.origin, book_a_flight_data.Flight.origin)
        suggestionsWindow(book_a_flight_data.Flight.origin, book_a_flight_data.Flight.originName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        book_a_flight_object.origin.clear();
        Reservation.allerrormessages.getText().then(function (a) {
            expect(a.toString()).toEqual(errormessage.invalidOriginDestination.message);
        });
    });

    xit('Validate Invalid origin (numerical data)', function () {
        book_a_flight_object.search_by_route.click();
        browser.sleep(10000);
        setValue(book_a_flight_object.origin, book_a_flight_data.invalidData.numericalOrgin)
        Reservation.allerrormessages.getText().then(function (a) {
            expect(a.toString()).toEqual(errormessage.inValidOrigin.message + ',' + errormessage.onlyCharacters.message);
        });
    });

    xit('Validate Invalid destination(numerical data)', function () {
        book_a_flight_object.search_by_route.click();
        browser.sleep(10000);
        setValue(book_a_flight_object.destination, book_a_flight_data.invalidData.numericalDestination)
        Reservation.allerrormessages.getText().then(function (a) {
            expect(a.toString()).toEqual(errormessage.inValidDestination.message + ',' + errormessage.onlyCharacters.message);
        })
    });


    xit('Validate Invalid Origin(Alphabetical)', function () {
        book_a_flight_object.search_by_route.click();
        browser.sleep(10000);
        setValue(book_a_flight_object.origin, book_a_flight_data.invalidData.invalidOrigin)
        Reservation.allerrormessages.getText().then(function (a) {
            expect(a.toString()).toEqual(errormessage.inValidOrigin.message);
        })
    });

    xit('Validate Invalid Destination(Alphabetical)', function () {
        book_a_flight_object.search_by_route.click();
        browser.sleep(10000);
        setValue(book_a_flight_object.destination, book_a_flight_data.invalidData.invalidDestination)
        Reservation.allerrormessages.getText().then(function (a) {
            expect(a.toString()).toEqual(errormessage.inValidDestination.message);
        })
    });

    xit('Validate the error message when cleared the departure date', function () {
        book_a_flight_object.search_by_route.click();
        browser.sleep(10000);
        setValue(book_a_flight_object.origin, book_a_flight_data.Flight.origin)
        suggestionsWindow(book_a_flight_data.Flight.origin, book_a_flight_data.Flight.originName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        setValue(book_a_flight_object.destination, book_a_flight_data.Flight.destination)
        suggestionsWindow(book_a_flight_data.Flight.destination, book_a_flight_data.Flight.destinationName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        Reservation.dateclick.click();
        Reservation.clear.click();
        browser.sleep(20000);
        Reservation.allerrormessages.isPresent().then(function (j) {
            expect(j).toBe(true);
        });
    });

    xit('Validate that current day date is selected when selected today ', function () {
        var mm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var dd = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date();
        var days = d.getDay();
        var months = d.getMonth();
        var currentdate = d.getDate();
        if (currentdate < 10) {
            currentdate = '0' + currentdate;
        }
        Reservation.dateclick.click();
        Reservation.today.click();
        Reservation.dateclick.getText().then(function (response) {
            expect(response).toEqual(mm[months] + '\n' + currentdate + '\n' + dd[days]);
        })

    });

    xit('validate that close button works accordingly', function () {
        var EC = protractor.ExpectedConditions;
        Reservation.dateclick.click();
        Reservation.close.click();
        browser.wait(EC.invisibilityOf($('uib-datepicker-popup dropdown-menu')), 5000).then(function () {
            expect(Reservation.dateclick.isPresent()).toBe(true);
        })
    });

    xit('validate when Origin/destination specified roundtrip and multileg radio buttons are enabled', function () {
        setValue(book_a_flight_object.origin, book_a_flight_data.Flight.origin)
        suggestionsWindow(book_a_flight_data.Flight.origin, book_a_flight_data.Flight.originName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        setValue(book_a_flight_object.destination, book_a_flight_data.Flight.destination)
        suggestionsWindow(book_a_flight_data.Flight.destination, book_a_flight_data.Flight.destinationName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        browser.sleep(20000);
        book_a_flight_object.roundTrip.isEnabled().then(function (res) {
            // console.log('res' + res);
            if (res === true) {
                expect(res).toBe(true);
            }
            else {
                fail('roundtrip radio button is disabled when Origin/destination are specified on Reservation screen');
            }
        });
        book_a_flight_object.multistop.isEnabled().then(function (res1) {
            // console.log('res1' + res1);
            if (res1 === true) {
                expect(res1).toBe(true);
            }
            else {
                fail('multistop radio button is disabled when Origin/destination are specified on Reservation screen');
            }
        })
    });

    // should work on it

    // it('validate to check the near by ramps when checked', function () {
    //     book_a_flight_object.originNearByRamp.click().then(function () {
    //         book_a_flight_object.originNearByRamp.isPresent().then(function (response) {
    //             if (response === true) {
    //                 expect(response).toBe(true);
    //             }
    //             else {
    //                 expect(response).toBe(false);
    //             }
    //         });
    //     });
    // });


    // it('validate to check the near by ramps when its not checked', function () {
    //     book_a_flight_object.nearbyrampsunchecked.isPresent().then(function (response) {
    //         expect(response).toBe(true);
    //     })
    // });

    xit('Validate that by default GMT is selected in Timezone tab', function () {
        browser.refresh();
        book_a_flight_object.WaitForPageToLoad();
        book_a_flight_object.timezone.isSelected().then(function (result) {
            if (result === true) {
                expect(result).toBe(true);
            } else {
                fail('By default Local is displayed');
            }
        });
    });

    // work on reset button

    xit('Search of valid origin and destination displayes flight results', function () {
        browser.refresh();
        book_a_flight_object.WaitForPageToLoad();
        setValue(book_a_flight_object.origin, book_a_flight_data.Flight.origin)
        suggestionsWindow(book_a_flight_data.Flight.orisgin, book_a_flight_data.Flight.originName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        setValue(book_a_flight_object.destination, book_a_flight_data.Flight.destination)
        suggestionsWindow(book_a_flight_data.Flight.destination, book_a_flight_data.Flight.destinationName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        browser.sleep(20000);
        book_a_flight_object.searchFlight.click();
        book_a_flight_object.expectcondition();
    });

    function searchFlightByFlightNumber (ele, value) {
        var j = -1;
        return ele.getText().then(function (val) {
            for (var index = 0; index < val.length; index++) {
                if (val[index] === value) {
                    j = index;
                }
            }
            return j;
        });
    }

    var spinner = element(by.xpath('//div[contains(@class,"spinner")]'));

    function waitForVisibilityOfSpinner () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(spinner), 5000);
    };

    function waitForInvisbilityOfSpinner () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.invisibilityOf(spinner), 8000);
    }

    function waitForSpinnerExecution () {
        spinner.isPresent().then(function (res) {
            if (res === true) {
                spinner.isDisplayed().then(function (resDisplayed) {
                    if (resDisplayed === true) {
                        waitForInvisbilityOfSpinner();
                    } else if (resDisplayed === false) {
                        waitForVisibilityOfSpinner();
                        waitForInvisbilityOfSpinner();
                    }
                })
            }
        })
    };

    it('Validate the expected flight details is displayed when valid Origin/destination enterd', function () {
        browser.refresh();
        book_a_flight_object.WaitForPageToLoad();
        setValue(book_a_flight_object.origin, book_a_flight_data.Flight.origin)
        suggestionsWindow(book_a_flight_data.Flight.origin, book_a_flight_data.Flight.originName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        setValue(book_a_flight_object.destination, book_a_flight_data.Flight.destination)
        suggestionsWindow(book_a_flight_data.Flight.destination, book_a_flight_data.Flight.destinationName).then(function (j) {
            Commonobjects.suggestions.get(j).click();
        });
        datepicker(book_a_flight_object.departuredate, book_a_flight_data.departureFlight.flightDate);
        book_a_flight_object.searchFlight.click();
        waitForSpinnerExecution();
        searchFlightByFlightNumber(book_a_flight_object.FlightNumber, book_a_flight_data.Flight.FlightNumber).then(function (j) {
            if (j === -1) {
                fail('No Flight with flightNumber ' + book_a_flight_data.departureFlight.flightNumber + ' found');
            } else {
                book_a_flight_object.outboundFlightNumber.get(j).getText().then(function (flightNumber) {
                    book_a_flight_object.outboundFlightAircraftType.get(j).getText().then(function (aircraftType) {
                        book_a_flight_object.outboundFlightSourceAndDestination.get(j).getText().then(function (sourceAndDestination) {
                            book_a_flight_object.outboundFlightDepartureTime.get(j).getText().then(function (departureTime) {
                                book_a_flight_object.outboundFlightArrivalTime.get(j).getText().then(function (arrivalTime) {
                                    book_a_flight_object.outboundFlightShow.get(j).getText().then(function (show) {
                                        book_a_flight_object.outboundFlightSeatAvailability.get(j).getText().then(function (seatStatus) {
                                            expect(flightNumber + ' ' + aircraftType + ' ' + sourceAndDestination + ' ' + departureTime + ' ' + arrivalTime + ' ' + show + ' ' + seatStatus).toEqual(book_a_flight_data.departureFlight.flightNumber + ' ' +
                                                book_a_flight_data.departureFlight.aircraftType + ' ' + book_a_flight_data.Flight.origin + '\n' + book_a_flight_data.Flight.destination + ' ' + '*' + ' ' + book_a_flight_data.departureFlight.flightTime.gmt.departure + '\n' +
                                                book_a_flight_data.departureFlight.flightTime.gmt.arrival + ' ' + book_a_flight_data.departureFlight.showTime.General + ' ' + book_a_flight_data.departureFlight.seat);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        })
    });

    it('Click a flight and select a travel status', function () {
        searchFlightByFlightNumber(book_a_flight_object.FlightNumber, book_a_flight_data.Flight.FlightNumber).then(function (j) {
            if (j === -1) {
                fail('No Flight with flightNumber ' + book_a_flight_data.departureFlight.flightNumber + ' found');
            } else {
                book_a_flight_object.outboundFlightSourceAndDestination.get(j).click();
                waitForSpinnerExecution();
            }
            book_a_flight_object.travelStatus.click();
            var v = element.all(by.tagName('option'));
            v.get(1).getText().then(function (options) {
                book_a_flight_object.TSoption1.click();
                waitForSpinnerExecution();
                book_a_flight_object.confirmbutton.click();
                waitForSpinnerExecution();
                book_a_flight_object.bookedFlightSuccessfully.isPresent().then(function (res) {
                    expect(res).toBe(true);
                });
                book_a_flight_object.myReservationTab.click();
                waitForSpinnerExecution();
                book_a_flight_object.viewList.click();
                waitForSpinnerExecution();
                datepicker(book_a_flight_object.startDateTriggerElement, book_a_flight_data.departureFlight.flightDate);
                datepicker(book_a_flight_object.endDateTriggerElement, book_a_flight_data.departureFlight.flightDate);
            })
        });
    });


});
