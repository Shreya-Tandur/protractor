/**
 * main function that does all the magic.
 * @param {string} parent -- xpath of Parent element from which the calendar dropdown appears
 * @param {string} jsDateString -- This should be a valid js date string
 * @param {string} [triggerElement] -- xpath of Optional triggerElement that would trigger the dropdown.
 */
function pickDate (parent, jsDateString, triggerElement) {
  // Convert the provided date string into date object
  var dt = new Date(jsDateString);

  // Months array
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Get the parent element from the xpath
  var div = element(by.xpath(parent));

  // If triggerElement is passed, we perform a click on it else falls back to parent
  if (triggerElement) {
    element(by.xpath(triggerElement)).click();
  } else {
    // Clicking on parent element to get the dropdown
    div.click();
  }

  var day = dt.getDate();

  // -Start- Resolving the calendar elements based on the parent element
  var leftArrowElement = div.element(by.xpath('//button[@ng-click="move(-1)"]'));
  var rightArrowElement = div.element(by.xpath('//button[@ng-click="move(1)"]'));
  var switchElement = div.element(by.xpath('//button[@ng-click="toggleMode()"]'));
  var monthElement = div.element(by.xpath('//span[text()="' + months[dt.getMonth()] + '"]'));
  var dayElement = div.element(by.xpath('(//button[@ng-click="select(dt.date)"]/span[not(contains(@class,"text-muted"))])[' + day + ']'));

  // -End- Resolving the calendar elements based on the parent element

  // -Start- Double Click on the switch element to arrive @ years selection
  switchElement.click();
  // -End- Double Click on the switch element to arrive @ years selection

  // -Start- Determine how many times to click left/right icons to arrive @ provided year
  var dtrange = '';
  switchElement.getText().then(function (val) {
    dtrange = val;
  });

  // Waiting for above promise to resolve
  protractor.promise.controlFlow().execute(function () {
    var currentYear = dtrange;
    var tmp = '';
    var whichDirection = '';
    var providedYear = dt.getFullYear();
    if (currentYear > providedYear) {
      tmp = currentYear - providedYear;
      whichDirection = leftArrowElement;
    } else if (providedYear > currentYear) {
      tmp = providedYear - currentYear;
      whichDirection = rightArrowElement;
    }
    // -End- Determine how many times to click left/right icons to arrive @ year

    // Click through either the left or right arrow to arrive @ the provided year on the UI
    for (var i = 0; i < tmp; i++) {
      whichDirection.click();
    }

    // Get current day
    //  var dd = (new Date()).getDate();

    // Click on month
    clickIfElemPresent(monthElement);
    browser.sleep(1000);
    clickIfElemPresent(dayElement);
    // // validating whether provided day is grater than current day or not
    // if (day > dd) {
    //   clickIfElemPresent(dayElement);
    // } else {
    //   element(by.xpath(triggerElement)).click();
    // }
  });
}

/**
 * This method clicks on the provided element only if the element is present.
 */
function clickIfElemPresent (ele) {
  ele.isPresent().then(function (result) {
    if (result) {
      ele.click();
    }
  });
}

module.exports = pickDate;
