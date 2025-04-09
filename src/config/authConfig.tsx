export const getAuthConfig = () => {
    const token = sessionStorage.getItem('authToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };