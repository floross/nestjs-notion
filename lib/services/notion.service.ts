import { Inject, Injectable, Logger as NestjsLogger } from '@nestjs/common';
import { Client, Logger as NotionLogger, LogLevel } from '@notionhq/client';
import {
  SearchParameters,
  SearchResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { RequestParameters } from '@notionhq/client/build/src/Client';

import { NotionModuleOptions } from '../interfaces';
import { NOTION_MODULE_OPTIONS } from '../notion.constants';

@Injectable()
export class NotionService {
  private readonly logger = new NestjsLogger(NotionService.name);

  protected _notion: Client;

  constructor(
    @Inject(NOTION_MODULE_OPTIONS)
    protected readonly notionModuleOptions: NotionModuleOptions,
  ) {
    const { nestjsLogger, ...notionOptions } = notionModuleOptions;

    const logger = nestjsLogger ?? this.logger;
    this._notion = new Client({
      logger: this.createLoggerBridge(logger),
      ...notionOptions,
    });
  }

  public get notion() {
    return this._notion;
  }

  public get blocks() {
    return this.notion.blocks;
  }

  public get databases() {
    return this.notion.databases;
  }

  public get pages() {
    return this.notion.pages;
  }

  public request<Response>(
    requestParameters: RequestParameters,
  ): Promise<Response> {
    return this.notion.request(requestParameters);
  }

  public search(args: SearchParameters): Promise<SearchResponse> {
    return this.notion.search(args);
  }

  public get users() {
    return this.notion.users;
  }

  protected createLoggerBridge(logger: NestjsLogger): NotionLogger {
    return (
      level: LogLevel,
      message: string,
      extraInfo: Record<string, unknown>,
    ) => {
      switch (level) {
        case LogLevel.DEBUG:
        case LogLevel.WARN:
        case LogLevel.ERROR:
          logger[level](message);
          break;
        case LogLevel.INFO:
          logger.log(message);
          break;

        default:
          throw new Error(`notion log level not found`);
      }
      if (typeof extraInfo !== 'undefined') logger.verbose(extraInfo);
    };
  }
}
