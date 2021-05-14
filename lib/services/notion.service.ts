import { Inject, Injectable, Logger as NestjsLogger } from '@nestjs/common';
import {
  Client as NotionClient,
  Logger as NotionLogger,
  LogLevel,
} from '@notionhq/client';

import { NotionModuleOptions } from '../interfaces';
import { NOTION_MODULE_OPTIONS } from '../notion.constants';

@Injectable()
export class NotionService {
  private readonly logger = new NestjsLogger(NotionService.name);

  protected _notion: NotionClient;

  constructor(
    @Inject(NOTION_MODULE_OPTIONS)
    protected readonly notionModuleOptions: NotionModuleOptions,
  ) {
    const { nestjsLogger, ...notionOptions } = notionModuleOptions;

    const logger = nestjsLogger ?? this.logger;
    this._notion = new NotionClient({
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

  public get request() {
    return this.notion.request;
  }

  public get search() {
    return this.notion.search;
  }

  public get users() {
    return this.notion.users;
  }

  protected createLoggerBridge(nestjsLogger: NestjsLogger): NotionLogger {
    return (
      level: LogLevel,
      message: string,
      extraInfo: Record<string, unknown>,
    ) => {
      nestjsLogger[level](message);
      nestjsLogger.verbose(extraInfo);
    };
  }
}
