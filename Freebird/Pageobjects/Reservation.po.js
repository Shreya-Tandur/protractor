var reservation = function () {
    this.allerrormessages = element.all(by.xpath("//small[@class='text-danger']"));
    this.dateclick = element(by.xpath('//div[@ng-click="vm.openDatePicker(\'departureDate\')"]'));
    this.clear = element(by.xpath('//button[@ng-click="select(null, $event)"]'));
    this.today = element(by.buttonText('Today'));
    this.close = element(by.buttonText('Close'));
    this.daterowscolumns = element(by.xpath('//ul[@ng-click=\'$event.stopPropagation()\']'));

}
module.exports = reservation;