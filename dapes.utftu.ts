import {Group, Task, getAbsolutePath, publishPackage, startIfMain} from 'dapes';

const build = new Task({
  name: 'build',
  exec: async (ctx) => {
    await ctx.command('npm run build');
  },
});

const publish = new Task({
  name: 'publish',
  parents: [build],
  exec: async (ctx) => {
    publishPackage({
      pathToPackage: getAbsolutePath('./package.json', import.meta),
      ctx,
      version: 'patch',
    });
  },
});

const group = new Group({
  name: '',
  tasks: [build, publish],
  // subgroups: []
});

startIfMain(group, import.meta);
