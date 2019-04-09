import asana from 'asana';

const integrations = {
  asana: {
    docs: 'https://github.com/Asana/node-asana',
    token: '0/2070831b62e3caaeee79d9e206b967de'
  }
};

export default class TaskService {

  static getTasks(projectId, provider = 'asana') {
    return new Promise((resolve, reject) => {
      const { token } = integrations[provider];
      const client = asana.Client.create().useAccessToken(token);
      try {
        client
          .tasks.findByProject(projectId, { opt_fields: 'id, gid, name, completed' })
          .then((tasks) => resolve(tasks));
      } catch (e) {
        reject(JSON.stringify(e));
      }
    });
  }
}
