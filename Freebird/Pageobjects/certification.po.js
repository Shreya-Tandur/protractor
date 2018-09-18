var certification = function () {
    // this.certificationlink = element(by.xpath('//a[text()=\'Certification\']'));
    // this.status = element(by.xpath('//i[@ng-if=\'item.isActive\']'));
    this.certificationstatus = element(by.xpath('//span[@class=\'text-danger\']'));
    this.takeAtest = element(by.xpath('//li[contains(text(),\'Take a Test\')]'));
    this.certificationpage = element(by.xpath("//p[contains(text(),'The events of September 11, 2001 have caused Federal Express')]"));
    this.criminalQ1 = element(by.xpath("//p[text()='1. Excluding routine traffic citations (DWI/DUI matters are not considered routine traffic violations), have you been formally charged with or convicted with a crime in the last 10 years?']"));
    this.takeAtestButton = element(by.xpath("//button[@ng-click='goToNextStep(2)']"));
    this.takeAtestpage = element(by.xpath("//div[contains(text(),'All FedEx employees must pass the Jumpseat Certification Test every 6 months, in order to reserve a fight,')]"));
    this.certificationTest = element(by.xpath("//b[text()='You will have to take certification test to reserve a flight.']"));
    this.welcomeAboardpage = element(by.xpath("//div[@class='col-xs-12 padding-top-15 padding-bottom-15']//following-sibling::div"));
    // this.welcomeAboardpage = element(by.xpath('//b[contains(text(),\'WelcomeAboard\')]'));
    this.continue = element(by.xpath("//button[@ng-click='goToNextStep(3)']"));
    // this.continue = element(by.xpath('//button[text()=\'Continue\']'));
    // this.question1 = element(by.xpath('//p[text()=\'1. Excluding routine traffic citations (DWI/DUI matters are not considered routine traffic violations), have you been formally charged with or convicted with a crime in the last 10 years?\']'));
    this.criminalQ2 = element(by.xpath('//p[text()=\'2. In the last 10 years, have you been convicted of any crime?\']'));
    this.criminalQ3 = element(by.xpath('//p[text()=\'3. Are you presently under indictment, or a defendant, or do you have charges pending against you in any criminal proceeding? \']'));
    this.question1radiobuttonno = element(by.xpath('//input[@ng-model=\'crimeQuestions.first\' and @value=\'no\']'));
    this.question1radiobuttonyes = element(by.xpath("//input[@ng-model='crimeQuestions.first' and @value='yes']"));
    this.question2radiobuttonno = element(by.xpath('//input[@ng-model=\'crimeQuestions.second\' and @value=\'no\']'));
    this.question3radiobuttonno = element(by.xpath('//input[@ng-model=\'crimeQuestions.third\' and @value=\'no\']'));
    this.submit = element(by.xpath('//button[contains(text(),\'Submit\')]'));
    this.caution = element(by.xpath("//div[@class='padding-bottom-15'][4]"));
    this.crimecheck_checkbox = element(by.xpath("//label[contains(text(),'Click here to authorize crime check')]"));
    this.CheckboxIcon = element(by.xpath('//input[@id=\'auth_crime_check\']'));
    // this.checked = element(by.xpath('//input[@id=\'auth_crime_check\']'));
    // this.HandicapCheck = element(by.xpath("//input[@ng-model='impairment.radio' and @value='no']"));
    // this.HandicapPageValidation = element(by.xpath("//p[text()=' Physical Impairment/Handicap Conditions. ']"));

    this.certification = element(by.xpath("//a[text()='Certification']"));
    this.certificationTitle = element(by.xpath('//span[@class="sidebar-title"]'));
};

module.exports = certification;