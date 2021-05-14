import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Client, Logger, LogLevel } from '@notionhq/client';
import { ClientOptions } from '@notionhq/client/build/src/Client';
import { Logger as NestjsLogger } from '@nestjs/common';

new Client();

export interface NotionModuleOptions extends ClientOptions {
  nestjsLogger?: NestjsLogger;
}

export interface NotionOptionsFactory {
  createNotionOptions(): Promise<NotionModuleOptions> | NotionModuleOptions;
}

export interface NotionModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<NotionOptionsFactory>;
  useClass?: Type<NotionOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NotionModuleOptions> | NotionModuleOptions;
  inject?: any[];
}
