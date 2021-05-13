import { exec, ExecException } from 'child_process';
import { promisify } from 'util';
const _exec = promisify(exec);

async function pullAndReloadVmPm2App(req: any, res: any) {
  const gitUser = process.env.GIT_USER as string;
  const gitPass = process.env.GIT_PASS as string;
  const repository = req.body.repository.full_name;
  const pusher = req.body.pusher;
  const repositoryUrl = `https://${gitUser}:${gitPass}@github.com/${repository}`;

  try {
    await _exec(`git config user.name ${pusher.name}`);
    await _exec(`git config user.email ${pusher.email}`);
    await _exec(`git stash`);
    await _exec(`git pull ${repositoryUrl} ${process.env.NODE_ENV === 'development' ? 'staging' : 'master'}`);

    const pm2Env = process.env.NODE_ENV || 'development';
    await _exec("npm install");

    res.sendStatus(200);
    
    _exec(`pm2 reload ecosystem.config.js --update-env ${pm2Env} --force`);
  }
  catch (err) {
    const error = `Erro deploy: ${(err as ExecException).message}`; 
    res.status(502).send(JSON.stringify(error));
  }
}

export { pullAndReloadVmPm2App };