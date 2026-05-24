export const saveCartId = (cartId: string): void => {
  try {
    localStorage.setItem('cartID', cartId);
  } catch (error) {
    console.error('Erro ao salvar cartID no localStorage:', error);
  }
};

export const getCartId = (): string | null=> {
  try {
    return localStorage.getItem('cartID');
  } catch (error) {
    console.error('Erro ao recuperar cartID do localStorage:', error);
    return null;
  }
};

export const deleteCartId = (): void => {
  try {
    localStorage.removeItem('cartID');
  } catch (error) {
    console.error('Erro ao remover cartID do localStorage:', error);
  }
};


/////////////////////////////////////////////////////////////////

export const saveAuthToken = (token: string): void => {
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Erro ao salvar o token JWT no localStorage:', error);
  }
};

// Função para recuperar o token JWT do localStorage
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Erro ao recuperar o token JWT do localStorage:', error);
    return null;
  }
};

// Função para remover o token JWT do localStorage (logout)
export const deleteAuthToken = (): void => {
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Erro ao remover o token JWT do localStorage:', error);
  }
};

