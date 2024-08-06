import React from "react";
import { IUserContext } from "./Types";

export const UserContext = React.createContext<IUserContext>({} as IUserContext)