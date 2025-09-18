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
