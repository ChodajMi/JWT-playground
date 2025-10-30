const JWTUtils = {
  base64UrlEncode(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  },
  base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return atob(base64);
  },
  generateSignature(data, secret) {
    let hash = 0;
    const combined = data + secret;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return this.base64UrlEncode(Math.abs(hash).toString(16));
  },
  generateToken(payload, secret = 'mysecretkey') {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signature = this.generateSignature(`${encodedHeader}.${encodedPayload}`, secret);
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  },
  decodeToken(token) {
    const [header, payload, signature] = token.split('.');
    return {
      header: JSON.parse(this.base64UrlDecode(header)),
      payload: JSON.parse(this.base64UrlDecode(payload)),
      signature,
    };
  },
  validateToken(token, secret = 'mysecretkey') {
    try {
      const [header, payload, signature] = token.split('.');
      const expected = this.generateSignature(`${header}.${payload}`, secret);
      if (expected !== signature) return { valid: false, reason: 'Invalid signature!' };
      const decoded = JSON.parse(this.base64UrlDecode(payload));
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) return { valid: false, reason: 'Token expired!' };
      return { valid: true, reason: 'Token is valid!' };
    } catch {
      return { valid: false, reason: 'Invalid token format!' };
    }
  }
};
