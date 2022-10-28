// Libs
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Logger } from 'winston';

// Classes
class GraphApiModel {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * A method to the user's email using the graph api.
   */
  public async getUserEmail(access_token: string): Promise<string | undefined> {
    this.logger.info('Getting the user email using the graph API...');
    try {
      const url = `${this.getGraphUrl()}/me`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });

      this.logger.info('The user\'s email has been caught.');

      return response.data.userPrincipalName;
    } catch (err) {
      this.logger.warn(`The request to the graph api has returned an error. Error: ${err}`);
      return;
    }
  }

  /**
   * A method to get the user's access token.
   */
  public async getAccessToken(authorizationCode: string): Promise<string | undefined> {
    this.logger.info('Getting the access token using the graph API...');
    const url = `${this.getUrlPrefix()}/token`;

    try {
      this.logger.info(`Doing request to: ${url}`);
      const response = await axios.post(
        url,
        new URLSearchParams(this.getTokenQuery(authorizationCode)),
        {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

      if (!response.data.access_token) {
        this.logger.info('The access token was not defined in the body.');
        return;
      }
      return response.data.access_token;

    } catch (err) {
      this.logger.warn(`Couldn't get the access token to the graph API. Error: ${err}`);
      return;
    }
  }

  /**
   * A method to get the url to authorize the user.
   */
  public getAuthUrl(): string {
    // Treat the query.
    const url = `${this.getUrlPrefix()}/authorize?${this.getAuthQuery()}`;

    this.logger.info(`Redirecting client to: ${url}`);
    return url;
  }

  /**
   * A method to get the query to be used on the authorization step.
   */
  private getAuthQuery(): string {
    const appId = process.env.GRAPHAPI_APPID;
    const applicationUrl = process.env.APPLICATION_URL;

    const query: any = {
      'client_id': appId,
      '&response_type': 'code',
      '&redirect_uri': `${applicationUrl}/microsoftAuth`,
      '&response_mode': 'query',
      '&scope': 'offline_access%20user.read'
    }

    return Object.keys(query).map((queryKey) => `${queryKey}=${query[queryKey]}` ).join('');
  }

  /**
   * A method to get the query to be used in the token step.
   */
  private getTokenQuery(authorizationCode: string): any {
    const appId = process.env.GRAPHAPI_APPID;
    const azureSecret = process.env.GRAPHAPI_SECRET;
    const applicationUrl = process.env.APPLICATION_URL;

    const query: any = {
      'client_id': appId,
      'scope': 'user.read',
      'code': authorizationCode,
      'redirect_uri': `${applicationUrl}/microsoftAuth`,
      'grant_type': 'authorization_code',
      'client_secret': azureSecret
    }

    return query;
  }

  /**
   * A method to get the init from the microsoft's url.
   */
  private getUrlPrefix(): string {
    const tenantId = process.env.GRAPHAPI_TENANTID;
    return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0`;
  }

  /**
   * A method to get the graph API url.
   */
  private getGraphUrl(): string {
    return 'https://graph.microsoft.com/v1.0';
  }
}

// Code
export default GraphApiModel;