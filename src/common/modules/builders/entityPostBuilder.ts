import {Entities, webApiBaseUrl} from '../../constants';

export const entityPostBuilder = (controller: Entities) => <Tin, Tout>(
  action: string,
) => async (input: Tin): Promise<Tout> => {
  try {
    const response = await fetch(`${webApiBaseUrl}/${controller}/${action}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    return (await response.json()) as Tout;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
