export const getEnvs = <const T extends readonly string[]>(
  envs: T,
): {[K in T[number]]: string} => {
  const obj = {} as {[K in T[number]]: string};

  for (const envName of envs) {
    process.env;
    const env = process.env[envName];

    if (!env) {
      throw new Error(`Env ${envName} doesn't exist`);
    }

    obj[envName as T[number]] = env;
  }

  return obj;
};

export const getEnv = (name: string): string => {
  const env = process.env[name];

  if (!env) {
    throw new Error(`Env ${name} doesn't exist`);
  }

  return env;
};
