import {Entities, webApiBaseUrl} from '../../common/constants';
import {RestoreApiInputData, RestoreApiOutputData} from '../../common/interfaces/web-api';

const restoreAccountBuilder = () => <RestoreApiInputData, RestoreApiOutputData>(
  action: string,
) => async (input: RestoreApiInputData): Promise<RestoreApiOutputData> => {
  try {
    console.log("uri", `${webApiBaseUrl}/${action}`);
    console.log("Data", input);
    const response = await fetch(`${webApiBaseUrl}/${action}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    return (await response.json()) as RestoreApiOutputData;
  } catch (err) {
    console.error(err);
    throw err;
  }  
};

const restoreBuilder = restoreAccountBuilder();

export const RestoreDal = {
  restore: restoreBuilder<RestoreApiInputData, RestoreApiOutputData>('account/restore'),
};

