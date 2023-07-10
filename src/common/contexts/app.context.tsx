import {
  useState,
  createContext,
  useMemo,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";
import { IMessage } from "../interfaces/global.interface";
import { IAuthorization } from "../interfaces/auth.interfaces";

interface IAppContext {
  authorization: IAuthorization;
  setAuthorization: Dispatch<SetStateAction<IAuthorization>>;
  message: IMessage;
  setMessage: Dispatch<SetStateAction<IMessage>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

interface IProps {
  children: ReactElement | ReactElement[];
}

export const AppContext = createContext<IAppContext>({
  authorization: {} as IAuthorization,
  setAuthorization: () => {},
  message: {} as IMessage,
  setMessage: () => {},
  step: {} as number,
  setStep: () => {},
});

export function AppContextProvider({ children }: IProps) {
  // States
  const [message, setMessage] = useState<IMessage>({} as IMessage);
  const [authorization, setAuthorization] = useState<IAuthorization>(
    {} as IAuthorization
  );
  const [step, setStep] = useState<number>(0);

  const values = useMemo<IAppContext>(() => {
    return {
      authorization,
      setAuthorization,
      message,
      setMessage,
      step,
      setStep,
    };
  }, [message, setMessage, authorization, setAuthorization, step, setStep]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
