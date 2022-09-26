// Classes
class CookieModel {
  static getCookie(cookieName) {
    const cookies = this.cookiesToJson();
    return cookies[cookieName];
  }

  static cookiesToJson() {
    const cookies = {};
    document.cookie.split(';').forEach(cookieEntry => {
      const key = cookieEntry.split('=')[0];
      const value = cookieEntry.split('=')[1];
      cookies[key] = value;
    });

    return cookies;
  }
}

// Code
export default CookieModel;