
export const base_url = "https://nanofirst.onrender.com/api/"
// export const base_url = "http://localhost:10000/api/"




const EXPIRATION_KEY = 'tokenExpiration';

export const manageToken = (token?: string): string | null => {


    const expirationTime = localStorage?.getItem(EXPIRATION_KEY);

    if (token && expirationTime) {
      const now = new Date().getTime();
      if (now > parseInt(expirationTime)) {
        // Token has expired
        localStorage?.removeItem('token');
        localStorage?.removeItem(EXPIRATION_KEY);
        localStorage?.removeItem('userId');
        return null;
      }
  }
};