import {Entities, webApiBaseUrl} from '../../constants';

export interface IServerError {
  status: number;
  body: any;
}

export const entityPostBuilder =
  (controller: Entities) =>
  <Tin, Tout>(action: string) =>
  async (input: Tin): Promise<Tout | IServerError> => {
    try {
      const response = await fetch(`${webApiBaseUrl}/${controller}/${action}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (response.status >= 400) {
        return {status: response.status, body: await response.json()};
      }

      return (await response.json()) as Tout;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  };
