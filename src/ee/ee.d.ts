type Handler<TValue = any> = (data: TValue) => void;
type WildHandler<TValue = any> = (name: string, data: TValue) => void;

type AnyHandler = Handler | WildHandler;

export function emitter<TEvents extends Map<string, AnyHandler[]>>(
  customEmitter?: TEvents
): {
  on(name: string, cb: AnyHandler);
  off(name: string, cb: AnyHandler);
  emit(name: string, data?: any);
};

export default emitter;
