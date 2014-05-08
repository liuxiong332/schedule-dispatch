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
});
