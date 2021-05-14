import { Module } from '@nestjs/common';
import { DynamicModule, Provider } from '@nestjs/common/interfaces';
import { v4 } from 'uuid';

import {
  NotionModuleOptions,
  NotionOptionsFactory,
  NotionModuleAsyncOptions,
} from './interfaces';
import { NOTION_MODULE_ID, NOTION_MODULE_OPTIONS } from './notion.constants';
import { NotionService } from './services';
import { mergeDefaults } from './utils';

@Module({
  imports: [],
  providers: [NotionService],
  exports: [],
})
export class NotionModule {
  static forRoot(options: NotionModuleOptions = {}): DynamicModule {
    return {
      module: NotionModule,
      providers: [
        {
          provide: NOTION_MODULE_OPTIONS,
          useValue: mergeDefaults(options),
        },
      ],
    };
  }

  static forRootAsync(options: NotionModuleAsyncOptions): DynamicModule {
    return {
      module: NotionModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: NOTION_MODULE_ID,
          useValue: v4(),
        },
      ],
    };
  }

  private static createAsyncProviders(
    options: NotionModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: NotionModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NOTION_MODULE_OPTIONS,
        useFactory: async (...args: any[]) =>
          mergeDefaults(await options.useFactory(...args)),
        inject: options.inject || [],
      };
    }
    return {
      provide: NOTION_MODULE_OPTIONS,
      useFactory: async (optionsFactory: NotionOptionsFactory) =>
        mergeDefaults(await optionsFactory.createNotionOptions()),
      inject: [options.useExisting || options.useClass],
    };
  }
}
