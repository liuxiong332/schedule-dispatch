'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/login");
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

  describe('login', function() {

    beforeEach(function() {
      browser.get('index.html#/login');
    });

    it('should render login when user navigates to /login', function() {
      expect(element(by.css('[ng-view] :first-child')).isPresent()).toBe(true);
    });

    it('should active the login link when click the login link', function() {
      expect()
    })

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/logup');
    });


    it('should render longup-page when user navigates to /view2', function() {
      expect(element(by.css('[ng-view] :first-child')).isPresent()).toBe(true);
    });

  });
});
