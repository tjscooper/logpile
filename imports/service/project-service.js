import asana from 'asana';

const integrations = {
  asana: {
    docs: 'https://github.com/Asana/node-asana',
    token: '0/2070831b62e3caaeee79d9e206b967de'
  }
};

export default class ProjectService {

  static getProjects(provider = 'asana') {
    return new Promise((resolve, reject) => {
      const { token } = integrations[provider];
      const client = asana.Client.create().useAccessToken(token);
      try {
        client.users.me().then((me) => {
          const workspace = me.workspaces[0].id;
          client
          .projects.findByWorkspace(workspace)
          .then((projects) => resolve(projects));
        });
      } catch (e) {
        reject(JSON.stringify(e));
      }
    });
  }
}
