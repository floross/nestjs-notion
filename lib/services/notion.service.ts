import { Inject, Injectable } from '@nestjs/common';
import { NotionModuleOptions } from '../interfaces';
import { Client as NotionClient } from '@notionhq/client';

import { NOTION_MODULE_OPTIONS } from '../notion.constants';

@Injectable()
export class NotionService {
  protected _notion: NotionClient;

  constructor(
    @Inject(NOTION_MODULE_OPTIONS)
    protected readonly notionModuleOptions: NotionModuleOptions,
  ) {
    this._notion = new NotionClient(notionModuleOptions);
  }

  public get notion() {
    return this._notion;
  }
}
