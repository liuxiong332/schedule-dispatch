'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });

  it('should active the specific link when click the link(login,logup)', function() {
    var loginLink = $('#loginLink');
    var logupLink = $('#logupLink');
    //the login link has active class
    expect(loginLink.getAttribute('class')).toBe('');
    expect(logupLink.getAttribute('class')).toBe('active');
    //when click the logup link, then the logup link get the active class
    loginLink.click();
    expect(loginLink.getAttribute('class')).toBe('active');
    expect(logupLink.getAttribute('class')).toBe('');
  });

  describe('signin', function() {

    beforeEach(function() {
      browser.get('index.html#/');
      $('#loginLink').click();
    });

    it('should show not existing when login with the wrong user', function() {
      var validSignin = {email: '1@123', password: '1'};
      var notMatchSignin = {email: '1@123', password: '12'};
      var notExistsSignin = {email: '1@1', password: '1'};

      var inputEmail = $('#inputEmail');
      var inputPassword = $('#inputPassword');
      var inputSignin = $('#inputSignin');
      inputEmail.sendKeys(notExistsSignin.email);
      inputPassword.sendKeys(notExistsSignin.password);
      inputSignin.click();

      var userExistsAlert = $('form div[ng-show="!isUserExists"]');
      var userCorrectAlert = $('[ng-show="isUserExists&&!isUserCorrect"]');
      expect(userExistsAlert.getText()).toMatch('用户不存在');
      expect(userExistsAlert.isDisplayed()).toBe(true);
      expect(userCorrectAlert.isDisplayed()).toBe(false);

      inputEmail.clear();
      inputEmail.sendKeys(notMatchSignin.email);
      inputPassword.clear();
      inputPassword.sendKeys(notMatchSignin.password);
      inputSignin.click();
      expect(userExistsAlert.isDisplayed()).toBe(false);
      expect(userCorrectAlert.isDisplayed()).toBe(true);

      inputEmail.clear();
      inputEmail.sendKeys(validSignin.email);
      inputPassword.clear();
      inputPassword.sendKeys(validSignin.password);
      inputSignin.click();
      expect(userExistsAlert.isDisplayed()).toBe(false);
      expect(userCorrectAlert.isDisplayed()).toBe(false);
    })

  });


  describe('signup', function() {
    beforeEach(function() {
      browser.get('index.html#/');
    });

    it('email should behave properly', function() {
      var emailRequireAlert = $('[ng-show="form.email.$error.required"]');

      var emailErrorAlert = $('.alert-danger[ng-show*="$error.email"]');

      expect(emailRequireAlert.isDisplayed()).toBe(true);
      expect(emailErrorAlert.isDisplayed()).toBe(false);

      var INVALID_EMAIL_ADDR = "123";
      $('#inputEmail').sendKeys(INVALID_EMAIL_ADDR);
      expect(emailRequireAlert.isDisplayed()).toBe(false);
      expect(emailErrorAlert.isDisplayed()).toBe(true);

      var EMAIL_ADDR = "123@152.com";
      $('#inputEmail').sendKeys(EMAIL_ADDR);
      expect(emailRequireAlert.isDisplayed()).toBe(false);
      expect(emailErrorAlert.isDisplayed()).toBe(false);
    });

    it('password should behave properly', function() {
      var passwordRequireAlert = $('[ng-show="form.password.$error.required"]');
      expect(passwordRequireAlert.isDisplayed()).toBe(true);

      var PASSWORD = "123";
      $('#inputPassword').sendKeys(PASSWORD);
      expect(passwordRequireAlert.isDisplayed()).toBe(false);
    });

    it('passwordVerify should require', function() {
      var passwordVerifyRequire =
        $('[ng-show="form.verifyPassword.$error.required"]');
      expect(passwordVerifyRequire.isDisplayed()).toBe(true);

      $('#inputVerifyPassword').sendKeys("123");
      expect(passwordVerifyRequire.isDisplayed()).toBe(false);
    });

    it('password should same as passwordVerify', function() {
      var passwordVerifyAlert = $('[ng-show*="$error.passwordVerify"]');
      var passwordInput = $('#inputPassword');
      var passwordVerifyInput = $('#inputVerifyPassword');

      function  setPasswordVerify(str) {
        passwordVerifyInput.clear();
        passwordVerifyInput.sendKeys(str);
      }

      function setPassword(str) {
        passwordInput.clear();
        passwordInput.sendKeys(str);
      }

      //if one input don't input anything, then alert don't show
      expect(passwordVerifyAlert.isDisplayed()).toBe(false);
      setPassword('123');
      expect(passwordVerifyAlert.isDisplayed()).toBe(false);

      passwordInput.clear();
      setPasswordVerify('123');
      expect(passwordVerifyAlert.isDisplayed()).toBe(false);

      //when password don't match, then the alert shows
      setPassword('123');
      setPasswordVerify('456');
      expect(passwordVerifyAlert.isDisplayed()).toBe(true);

      setPassword('123456');
      setPasswordVerify('123456');
      expect(passwordVerifyAlert.isDisplayed()).toBe(false);

      setPassword('123');
      expect(passwordVerifyAlert.isDisplayed()).toBe(true);

      setPasswordVerify('123');
      expect(passwordVerifyAlert.isDisplayed()).toBe(false);

      setPasswordVerify('123455');
      expect(passwordVerifyAlert.isDisplayed()).toBe(true);
    });

    it('should show "the user not available" when email exists', function() {
      var invalidSignup = {email: '1@1', password: '1'};
      var validSignup = {email: '1@123', password: '1'};

      function  setKeys(ctrl, keys) {
        ctrl.clear();
        ctrl.sendKeys(keys);
      }
      var inputEmail = $('#inputEmail');
      var inputPassword = $('#inputPassword');
      var inputVerifyPassword = $('#inputVerifyPassword');
      var inputSignup = $('form input[type="submit"]');

      var userNotAvailableAlert = $('form div[ng-show="!isUserAvailable"]');

      expect(inputSignup.getAttribute('value')).toMatch('注册');

      setKeys(inputEmail, invalidSignup.email);
      setKeys(inputPassword, invalidSignup.password);
      setKeys(inputVerifyPassword, invalidSignup.password);
      inputSignup.click();
      expect(userNotAvailableAlert.isDisplayed()).toBe(true);

      setKeys(inputEmail, validSignup.email);
      setKeys(inputPassword, validSignup.password);
      setKeys(inputVerifyPassword, validSignup.password);
      inputSignup.click();
      expect(userNotAvailableAlert.isDisplayed()).toBe(false);
    });
  });

  describe('task detail', function() {
    var base_url = 'index.html#/user/tasklist/';
    var PATH_URL = base_url + 'hello/world/';
    it('should only show the user link', function() {
      browser.get(base_url);
      var liArray = element.all(by.css('.breadcrumb.lead li'));
      expect(liArray.count()).toBe(1);
      expect(liArray.get(0).getText()).toMatch('user');
      liArray.get(0).$('a').click();
      expect(browser.getCurrentUrl()).toMatch(base_url);
    });

    it('should show all of the path', function() {
      browser.get(PATH_URL);
      var liArray = element.all(by.css('.breadcrumb.lead li a'));
      expect(liArray.count()).toBe(3);
      expect(liArray.get(0).getText()).toBe('user');
      expect(liArray.get(1).getText()).toBe('hello');
      expect(liArray.get(2).getText()).toBe('world');

      liArray.get(2).click();
      expect(browser.getCurrentUrl()).toMatch(/world\/$/);
      liArray.get(1).click();
      expect(browser.getCurrentUrl()).toMatch(/hello\/$/);
      liArray.get(0).click();
      expect(browser.getCurrentUrl()).toMatch(/user\/tasklist\/$/);
    });

    it('task overview should bind overview.content', function() {
      browser.get(PATH_URL);
      var  TEXT = "Hello World";
      var overviewTextInput = $('input[ng-model="overview.content"]');
      var overviewCompleteBtn = $('button[ng-click="overview.isInEdit=false"]');
      var overviewStatic = $('div[ng-show="!overview.isInEdit"] p');
      var overviewEditBtn = $('button[ng-click="overview.isInEdit=true"]');

      function expectEditDisplayed(editDis) {
        var divInEdit = $('div[ng-show="overview.isInEdit"]');
        var divStatic = $('div[ng-show="!overview.isInEdit"]');
        expect(divInEdit).toBeTruthy();
        expect(divStatic).toBeTruthy();
        expect(divInEdit.isDisplayed()).toBe(editDis);
        expect(divStatic.isDisplayed()).toBe(!editDis);
      }

      function expectTextEquality() {
        expect(overviewTextInput.getAttribute('value'))
          .toBe(overviewStatic.getText());
      }
      expectEditDisplayed(false);
      expectTextEquality();

      overviewEditBtn.click();
      expectEditDisplayed(true);

      overviewTextInput.clear();
      overviewTextInput.sendKeys(TEXT);
      expect(overviewTextInput.getAttribute('value'))
      .toBe(TEXT);
      // expectTextEquality();

      overviewCompleteBtn.click();
      expectEditDisplayed(false);
      expect(overviewStatic.getText())
      .toBe(TEXT);
    });

    it('beginDate and endDate should bind to specific content',
    function() {
      var taskDates = element.all(
        by.repeater('taskDate in [beginDate, endDate]'));
      expect(taskDates.count()).toBe(2);
      var dateControl = taskDates.get(0);

      function expectEditDisplayed(isEdit) {
        var divInEdit = dateControl.$('div[ng-show="taskDate.isInEdit"]');
        var divStatic = dateControl.$('div[ng-show="!taskDate.isInEdit"]');
        expect(divInEdit.isDisplayed()).toBe(isEdit);
        expect(divStatic.isDisplayed()).toBe(!isEdit);
      }

      var completeBtn =
      dateControl.$('button[ng-click="taskDate.isInEdit=false"]');
      var editBtn = dateControl.$('button[ng-click="taskDate.isInEdit=true"]');

      expectEditDisplayed(false);
      editBtn.click();
      expectEditDisplayed(true);
      completeBtn.click();
      expectEditDisplayed(false);
    })
  });
});
