// import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
// import { getCurrentUser } from "../../../screens/login/userService";
// import { cartReducer } from "../reducers/cartReducer";

// export interface UserType{
//   email:string;
//   username:string;
//   password:string;
// }

// const authContext=createContext<UserAction | null>({} as  UserAction )

// export const authProvider= ({children}:{children: ReactNode}) => {

// const[state,dispatch]=useReducer(authReducer,null)

//   return (
//     <authContext.Provider value={null}>
//       {children}
//     </authContext.Provider>
//   )
// }


// const useAuth=()=>useContext(authContext)

// type UserAction={
//   type:'LOG_IN'|'LOGOUT';
//   state:UserType
// }


// export const authReducer=(state:UserType,action:UserAction):UserType | null=>{

//   if (action.type==='LOG_IN'){
//      getCurrentUser()
//   }
//   else if (action.type==='LOGOUT')
//     return null

//   return state

// }



import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { getCurrentUser } from "../../../screens/login/userService";

// Tipo do usuário
export interface UserType {
  email: string;
  username: string;
  password?: string;
}

// Ações do reducer
type UserAction =
  | { type: "LOG_IN"; payload: UserType }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: UserType | null };

// Reducer
const authReducer = (state: UserType | null, action: UserAction): UserType | null => {
  switch (action.type) {
    case "LOG_IN":
    case "SET_USER":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

// Contexto
interface AuthContextType {
  user: UserType | null;
  dispatch: React.Dispatch<UserAction>;
  refreshUser: () => Promise<void>; // chamada explícita
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(authReducer, null);

  // Função para atualizar usuário explicitamente
  const refreshUser = async () => {
    const currentUser = await getCurrentUser();
    dispatch({ type: "SET_USER", payload: currentUser });
  };

  // Pega usuário automaticamente ao carregar
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, dispatch, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
