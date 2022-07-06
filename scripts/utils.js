import childProcess from 'node:child_process';

export const exec = (cmd, options) => {
  return childProcess.execSync(cmd, {
    stdio: 'inherit',
    shell: true,
    ...options,
  });
};

export const execAsync = (cmd) => {
  const execResult = childProcess.exec(cmd);

  execResult.stdout.pipe(process.stdout);
  execResult.stderr.pipe(process.stderr);
  return execResult;
};

export function spawnAsync(cmd, argv, options) {
  return childProcess.spawn(cmd, argv, {stdio: 'inherit', ...options});
}
