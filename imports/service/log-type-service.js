import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LogTypeService {

  static getInfo(logType) {
    let icon;
    let title;
    switch (logType) {
      // 1
      case 'PR_REVIEW':
        icon = <FontAwesomeIcon icon='vote-yea' />;
        title = 'Review Code';
        break;
      // 2
      case 'PR_SUBMIT':
        icon = <FontAwesomeIcon icon='code' />;
        title = 'Submit Code';
        break;
      // 3
      case 'PROJECT_WORK':
        icon = <FontAwesomeIcon icon='project-diagram' />;
        title = 'Project Work';
        break;
      // 4
      case 'MEETING':
        icon = <FontAwesomeIcon icon='comments' />;
        title = 'Meeting';
        break;
      // 5
      case 'REMINDER':
        icon = <FontAwesomeIcon icon='bell' />;
        title = 'Reminder';
        break;
      // 6
      case 'CALL':
        icon = <FontAwesomeIcon icon='headset' />;
        title = 'Call';
        break;
      // 7
      case 'BREAK':
        icon = <FontAwesomeIcon icon='coffee' />;
        title = 'Break Time';
        break;
      // 8
      case 'PING_PONG':
        icon = <FontAwesomeIcon icon='table-tennis' />;
        title = 'Ping Pong';
        break;
      // 9
      case 'STUFF':
        icon = <FontAwesomeIcon icon='bong' />;
        title = 'Doin Stuff';
        break;
      // X
      case 'CANCEL':
        icon = <FontAwesomeIcon icon='window-close' />;
        title = 'Nevermind';
        break;
    }
    return { icon, title };
  }
}
