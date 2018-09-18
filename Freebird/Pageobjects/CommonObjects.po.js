var v1 = function () {

    // var v3 = protractor.ExpectedConditions;
    // browser.wait(v3.elementToBeClickable(moveBy.xpath("//input[@id='username']")));
    this.suggestions = element.all(by.repeater('match in matches track by $index'));
}
module.exports = v1;