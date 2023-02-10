import {exec, execAsync} from './utils.js';

await execAsync('echo $(tput setaf 1)Red text');
