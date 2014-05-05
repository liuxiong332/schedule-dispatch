'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/signin");
  });

  it('should active the specific link when click the link(login,logup)', function() {
    var loginLink = element(by.css('#loginLink'));
    var logupLink = element(by.css('#logupLink'));
    //the login link has active class
    expect(loginLink.getAttribute('class')).toBe('active');
    expect(logupLink.getAttribute('class')).toBe('');
    //when click the logup link, then the logup link get the active class
    logupLink.click();
    expect(loginLink.getAttribute('class')).toBe('');
    expect(logupLink.getAttribute('class')).toBe('active');
  });

  describe('signin', function() {

    beforeEach(function() {
      browser.get('index.html#/signin');
    });

    it('should render login when user navigates to /login', function() {
      expect(element(by.css('[ng-view] :first-child')).isPresent()).toBe(true);
    });

    it('should active the login link when click the login link', function() {
      expect()
    })

  });


  describe('signup', function() {
    beforeEach(function() {
      browser.get('index.html#/signup');
    });

    it('should render longup-page when user navigates to /signup', function() {
      expect(element(by.css('[ng-view] :first-child')).isPresent()).toBe(true);
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
  });
});
