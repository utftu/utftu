import {ReactNode} from "react";

type Props<T> = {
  show: boolean,
  children: ReactNode
}



function Show<T>(props: Props<any>)

type useForceUpdate = () => () => void

export default useForceUpdate